import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/supabase/supabaseClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch profile for the current user
    const fetchProfile = async (userId) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()

        if (!error && data) {
            setProfile(data)
        }
    }

    // Listen to auth state changes
    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            if (session?.user) {
                await fetchProfile(session.user.id)
            }
            setLoading(false)
        }

        getSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null)
                if (session?.user) {
                    await fetchProfile(session.user.id)
                } else {
                    setProfile(null)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            throw new Error(error.message || `Login failed (status: ${error.status || 'unknown'})`)
        }
        return data
    }

    const register = async (email, password, fullName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        })
        if (error) {
            const msg = error.message
                ? `${error.message} (status: ${error.status || '-'})`
                : `Terjadi kesalahan pada server (status: ${error.status || 'unknown'})`
            throw new Error(msg)
        }
        return data
    }

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
    }

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id)
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, profile, loading, login, register, logout, refreshProfile }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
    return ctx
}
