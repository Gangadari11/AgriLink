"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../redux/slices/authSlice"
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlus,
} from "react-icons/fa"

const DashboardLayout = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  // Define navigation links based on user role
  const getNavLinks = () => {
    switch (userRole) {
      case "farmer":
        return [
          { path: "/farmer", icon: <FaHome />, label: "Dashboard" },
          { path: "/farmer/products", icon: <FaBox />, label: "My Products" },
          { path: "/farmer/add-product", icon: <FaPlus />, label: "Add Product" },
          { path: "/farmer/orders", icon: <FaShoppingCart />, label: "Orders" },
          { path: "/farmer/insights", icon: <FaChartLine />, label: "Insights" },
        ]
      case "buyer":
        return [
          { path: "/buyer", icon: <FaHome />, label: "Dashboard" },
          { path: "/marketplace", icon: <FaBox />, label: "Marketplace" },
          { path: "/buyer/orders", icon: <FaShoppingCart />, label: "My Orders" },
          { path: "/buyer/cart", icon: <FaShoppingCart />, label: "Cart" },
        ]
      case "admin":
        return [
          { path: "/admin", icon: <FaHome />, label: "Dashboard" },
          { path: "/admin/users", icon: <FaUsers />, label: "Users" },
          { path: "/admin/products", icon: <FaBox />, label: "Products" },
          { path: "/admin/orders", icon: <FaShoppingCart />, label: "Orders" },
          { path: "/admin/analytics", icon: <FaChartLine />, label: "Analytics" },
        ]
      default:
        return []
    }
  }

  const navLinks = getNavLinks()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-white shadow-md transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="text-xl font-bold text-primary-600">
            AgriLink
          </Link>
          <button
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      location.pathname === link.path
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t p-4">
            <div className="mb-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || "User"}</p>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                to={`/${userRole}/settings`}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="mr-3" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <button
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <div className="ml-auto flex items-center space-x-4">
            {userRole === "buyer" && (
              <Link to="/buyer/cart" className="relative rounded-full p-1 text-gray-700 hover:bg-gray-100">
                <FaShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  0
                </span>
              </Link>
            )}

            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
