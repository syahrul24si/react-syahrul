import "./assets/tailwind.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import React, { Suspense } from "react";

const Sidebar = React.lazy(() => import("./layouts/Sidebar"))
const Header = React.lazy(() => import("./layouts/Header"))

// Main (admin) pages
const Dashboard = React.lazy(() => import("./pages/main/Dashboard"))
const Orders = React.lazy(() => import("./pages/main/Orders"))
const Customers = React.lazy(() => import("./pages/main/Customers"))
const Produk = React.lazy(() => import("./pages/main/Produk"))
const Components = React.lazy(() => import("./pages/main/Components"))
const FiturXyz = React.lazy(() => import("./pages/main/FiturXyz"))
const Note = React.lazy(() => import("./pages/main/Note"))
const ProductDetail = React.lazy(() => import("./pages/main/ProductDetail"))
const NotFound = React.lazy(() => import("./pages/main/NotFound"))
const Error400 = React.lazy(() => import("./pages/main/Error400"))
const Error401 = React.lazy(() => import("./pages/main/Error401"))
const Error403 = React.lazy(() => import("./pages/main/Error403"))

// Auth pages
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))

// Member pages
const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"))
const MemberShop = React.lazy(() => import("./pages/member/MemberShop"))
const MemberCart = React.lazy(() => import("./pages/member/MemberCart"))
const MemberOrders = React.lazy(() => import("./pages/member/MemberOrders"))

const Loading = React.lazy(() => import("./components/Loading"))

// Smart redirect for "/" based on user role
function SmartRedirect() {
    const { profile, loading } = useAuth()
    if (loading) return <Loading />
    if (!profile) return <Navigate to="/login" replace />
    if (profile.role === "admin") return <Navigate to="/admin" replace />
    if (profile.role === "member") return <Navigate to="/dashboard" replace />
    return <Navigate to="/login" replace />
}

function AppRoutes() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Root redirect */}
                <Route path="/" element={<SmartRedirect />} />

                {/* Auth routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<Forgot />} />
                </Route>

                {/* Admin routes */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route element={<MainLayout />}>
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/admin/customers" element={<Customers />} />
                        <Route path="/admin/products" element={<Produk />} />
                        <Route path="/admin/products/:id" element={<ProductDetail />} />
                        <Route path="/admin/components" element={<Components />} />
                        <Route path="/admin/note" element={<Note />} />
                        <Route path="/admin/fitur-xyz" element={<FiturXyz />} />
                        <Route path="/admin/error-400" element={<Error400 />} />
                        <Route path="/admin/error-401" element={<Error401 />} />
                        <Route path="/admin/error-403" element={<Error403 />} />
                    </Route>
                </Route>

                {/* Member routes */}
                <Route element={<ProtectedRoute allowedRoles={["member", "admin"]} />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<MemberDashboard />} />
                        <Route path="/shop" element={<MemberShop />} />
                        <Route path="/cart" element={<MemberCart />} />
                        <Route path="/my-orders" element={<MemberOrders />} />
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <AppRoutes />
            </CartProvider>
        </AuthProvider>
    );
}
