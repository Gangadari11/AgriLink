import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"

// Pages
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ListProducePage from "./pages/ListProducePage"
import InsightsPage from "./pages/InsightsPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import FarmerDashboardPage from "./pages/FarmerDashboardPage"
import BuyerDashboardPage from "./pages/BuyerDashboardPage"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderSuccessPage from "./pages/OrderSuccessPage"
import NotFoundPage from "./pages/NotFoundPage"

// Protected Route Component
import ProtectedRoute from "./components/common/ProtectedRoute"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/list-produce" element={<ListProducePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Protected Routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/dashboard/*"
            element={
              <ProtectedRoute requiredRole="farmer">
                <FarmerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyer/dashboard/*"
            element={
              <ProtectedRoute requiredRole="buyer">
                <BuyerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
