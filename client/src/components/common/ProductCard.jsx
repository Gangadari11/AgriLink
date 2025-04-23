"use client"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"
import { FaShoppingCart, FaLeaf } from "react-icons/fa"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = "/login"
      return
    }

    dispatch(addToCart({ productId: product._id, quantity: 1 }))
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.organic && (
            <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white flex items-center">
              <FaLeaf className="mr-1" />
              Organic
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="mb-1 text-lg font-medium text-gray-900">{product.name}</h3>
        </Link>

        <div className="mb-2 flex items-center justify-between">
          <p className="text-lg font-bold text-primary-600">
            Rs. {product.price.toFixed(2)}/{product.unit}
          </p>
          <p className="text-sm text-gray-500">
            Available: {product.quantity} {product.unit}
          </p>
        </div>

        <p className="mb-3 text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <p>From: {product.farmerName}</p>
            <p>Location: {product.location}</p>
          </div>

          {isAuthenticated && user.role === "buyer" && (
            <button
              onClick={handleAddToCart}
              className="flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
            >
              <FaShoppingCart className="mr-1" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
