"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthStatus } from "./redux/slices/authSlice"

// Layouts
import MainLayout from "./layouts/MainLayout"
import DashboardLayout from "./layouts/DashboardLayout"

// Public Pages
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import MarketplacePage from "./pages/MarketplacePage"
import ProductDetailPage from "./pages/ProductDetailPage"

// Farmer Pages
import FarmerDashboard from "./pages/farmer/Dashboard"
import AddProduct from "./pages/farmer/AddProduct"
import ManageProducts from "./pages/farmer/ManageProducts"
import FarmerOrders from "./pages/farmer/Orders"
import FarmerInsights from "./pages/farmer/Insights"

// Buyer Pages
import BuyerDashboard from "./pages/buyer/Dashboard"
import BuyerOrders from "./pages/buyer/Orders"
import Cart from "./pages/buyer/Cart"
import Checkout from "./pages/buyer/Checkout"
import PaymentSuccess from "./pages/buyer/PaymentSuccess"
import PaymentFailed from "./pages/buyer/PaymentFailed"

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard"
import ManageUsers from "./pages/admin/ManageUsers"
import ManageAllProducts from "./pages/admin/ManageProducts"
import ManageAllOrders from "./pages/admin/ManageOrders"
import Analytics from "./pages/admin/Analytics"

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Farmer Routes */}
      <Route
        path="/farmer"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <DashboardLayout userRole="farmer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<FarmerDashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="orders" element={<FarmerOrders />} />
        <Route path="insights" element={<FarmerInsights />} />
      </Route>

      {/* Buyer Routes */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <DashboardLayout userRole="buyer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<BuyerDashboard />} />
        <Route path="orders" element={<BuyerOrders />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="payment/failed" element={<PaymentFailed />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout userRole="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="products" element={<ManageAllProducts />} />
        <Route path="orders" element={<ManageAllOrders />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Catch all - 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
