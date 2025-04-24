"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice"
import { FiMenu, FiX, FiShoppingCart, FiUser, FiGlobe } from "react-icons/fi"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState("English")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "List Produce", href: "/list-produce" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    dispatch(logout())
  }

  const getDashboardLink = () => {
    if (!user) return "/"

    switch (user.role) {
      case "farmer":
        return "/farmer/dashboard"
      case "buyer":
        return "/buyer/dashboard"
      case "admin":
        return "/admin/dashboard"
      default:
        return "/"
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="AgriLink Logo"
              className="h-10 w-10 mr-2"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/40x40?text=AL"
              }}
            />
            <span className="text-xl font-bold text-agri-primary">AgriLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-agri-primary ${
                  location.pathname === link.href ? "text-agri-primary" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center text-gray-600 hover:text-agri-primary"
              >
                <FiGlobe className="mr-1" />
                <span className="text-sm">{language}</span>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      setLanguage("English")
                      setIsLanguageDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("සිංහල")
                      setIsLanguageDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    සිංහල
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("தமிழ்")
                      setIsLanguageDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    தமிழ்
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-600 hover:text-agri-primary">
              <FiShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-agri-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons or User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center text-gray-600 hover:text-agri-primary"
                >
                  <FiUser className="h-5 w-5 mr-1" />
                  <span className="text-sm">{user?.name?.split(" ")[0] || "User"}</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to={getDashboardLink()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-agri-primary">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium bg-agri-primary text-white px-4 py-2 rounded-md hover:bg-agri-dark transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-600">
              <FiShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-agri-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-agri-primary focus:outline-none"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.href
                    ? "bg-agri-primary/10 text-agri-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-agri-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Language Options */}
            <div className="px-3 py-2 border-t border-gray-100 mt-2">
              <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
              <div className="space-y-1">
                <button
                  onClick={() => setLanguage("English")}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                    language === "English" ? "bg-agri-primary/10 text-agri-primary" : "text-gray-600"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("සිංහල")}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                    language === "සිංහල" ? "bg-agri-primary/10 text-agri-primary" : "text-gray-600"
                  }`}
                >
                  සිංහල
                </button>
                <button
                  onClick={() => setLanguage("தமிழ்")}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                    language === "தமிழ்" ? "bg-agri-primary/10 text-agri-primary" : "text-gray-600"
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            {/* Auth Buttons or User Menu */}
            <div className="px-3 py-2 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 mb-2">Account</p>
                  <Link
                    to={getDashboardLink()}
                    className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-agri-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-agri-primary"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-agri-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block text-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center px-3 py-2 rounded-md text-sm font-medium bg-agri-primary text-white hover:bg-agri-dark"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
