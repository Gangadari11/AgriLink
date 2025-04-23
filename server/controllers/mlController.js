const asyncHandler = require("express-async-handler")
const axios = require("axios")
const Product = require("../models/productModel")
const Order = require("../models/orderModel")

// @desc    Get product recommendations for a user
// @route   GET /api/ml/recommend
// @access  Private
const getRecommendations = asyncHandler(async (req, res) => {
  const userId = req.query.userId || req.user.id

  try {
    // Call ML API for recommendations
    const response = await axios.get(`${process.env.ML_API_URL}/recommend`, {
      params: { user_id: userId },
    })

    // Get recommended product IDs
    const recommendedProductIds = response.data.recommendations

    // Fetch product details
    const recommendedProducts = await Product.find({
      _id: { $in: recommendedProductIds },
    })

    res.json(recommendedProducts)
  } catch (error) {
    console.error("ML API Error:", error.message)

    // Fallback: Return some popular products
    const popularProducts = await Product.find({}).sort({ averageRating: -1 }).limit(5)

    res.json(popularProducts)
  }
})

// @desc    Get demand forecast for a product
// @route   GET /api/ml/forecast
// @access  Private/Farmer
const getDemandForecast = asyncHandler(async (req, res) => {
  const { productId } = req.query

  try {
    // Call ML API for demand forecast
    const response = await axios.get(`${process.env.ML_API_URL}/forecast`, {
      params: { product_id: productId },
    })

    res.json(response.data)
  } catch (error) {
    console.error("ML API Error:", error.message)

    // Fallback: Return simple forecast based on past orders
    const pastOrders = await Order.find({
      "items.product": productId,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
    })

    const totalQuantity = pastOrders.reduce((total, order) => {
      const item = order.items.find((item) => item.product.toString() === productId)
      return total + (item ? item.quantity : 0)
    }, 0)

    // Simple forecast: average daily demand * 7 for weekly forecast
    const dailyAverage = totalQuantity / 30
    const weeklyForecast = dailyAverage * 7

    res.json({
      forecast: {
        weekly: Math.round(weeklyForecast),
        trend: weeklyForecast > 0 ? "increasing" : "stable",
      },
    })
  }
})

// @desc    Get dynamic pricing recommendation
// @route   GET /api/ml/price
// @access  Private/Farmer
const getPriceRecommendation = asyncHandler(async (req, res) => {
  const { productId } = req.query

  try {
    // Call ML API for price recommendation
    const response = await axios.get(`${process.env.ML_API_URL}/price`, {
      params: { product_id: productId },
    })

    res.json(response.data)
  } catch (error) {
    console.error("ML API Error:", error.message)

    // Fallback: Return simple price recommendation based on similar products
    const product = await Product.findById(productId)

    if (!product) {
      res.status(404)
      throw new Error("Product not found")
    }

    // Find similar products
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    })

    // Calculate average price
    const totalPrice = similarProducts.reduce((total, prod) => total + prod.price, 0)
    const averagePrice = similarProducts.length > 0 ? totalPrice / similarProducts.length : product.price

    // Simple recommendation: ±10% of average price
    const minPrice = Math.round(averagePrice * 0.9)
    const maxPrice = Math.round(averagePrice * 1.1)
    const recommendedPrice = Math.round(averagePrice)

    res.json({
      currentPrice: product.price,
      recommendedPrice,
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
      reason: "Based on similar products in the same category",
    })
  }
})

module.exports = {
  getRecommendations,
  getDemandForecast,
  getPriceRecommendation,
}
