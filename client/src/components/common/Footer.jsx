import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="AgriLink" />
              <span className="ml-2 text-xl font-bold text-primary-600">AgriLink</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connecting farmers directly with consumers, eliminating middlemen and ensuring fresher produce at better
              prices.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-sm text-gray-600 hover:text-primary-600">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-primary-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-primary-600">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-primary-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm text-gray-600">123 Main Street, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm text-gray-600">+94 11 234 5678</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm text-gray-600">info@agrilink.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AgriLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
