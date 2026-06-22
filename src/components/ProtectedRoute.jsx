import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import Loading from "@/components/Loading"

export default function ProtectedRoute({ allowedRoles }) {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (profile && !allowedRoles.includes(profile.role)) {
        // Redirect based on actual role
        if (profile.role === "admin") return <Navigate to="/admin" replace />
        if (profile.role === "member") return <Navigate to="/dashboard" replace />
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
