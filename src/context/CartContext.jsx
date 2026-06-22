import { createContext, useContext, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, { ...product, quantity }]
        })
    }

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId, qty) => {
        if (qty <= 0) {
            removeFromCart(productId)
            return
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: qty } : item
            )
        )
    }

    const clearCart = () => setCartItems([])

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used inside CartProvider")
    return ctx
}
