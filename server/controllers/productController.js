const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")
const User = require("../models/userModel")

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // Build query
  const queryObj = { ...req.query }

  // Fields to exclude from filtering
  const excludedFields = ["page", "sort", "limit", "fields"]
  excludedFields.forEach((el) => delete queryObj[el])

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  let query = Product.find(JSON.parse(queryStr))

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ")
    query = query.sort(sortBy)
  } else {
    query = query.sort("-createdAt")
  }

  // Pagination
  const page = Number.parseInt(req.query.page, 10) || 1
  const limit = Number.parseInt(req.query.limit, 10) || 10
  const startIndex = (page - 1) * limit

  query = query.skip(startIndex).limit(limit)

  // Execute query
  const products = await query

  res.json(products)
})

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    unit,
    quantity,
    minimumOrder,
    category,
    features,
    organic,
    harvestDate,
    deliveryOptions,
    pickupAvailable,
  } = req.body

  // Get farmer details
  const farmer = await User.findById(req.user.id)

  // Create product
  const product = await Product.create({
    name,
    description,
    price,
    unit,
    quantity,
    minimumOrder: minimumOrder || 1,
    category,
    features: features ? features.split(",") : [],
    organic: organic === "true",
    harvestDate,
    farmer: req.user.id,
    farmerName: farmer.name,
    location: farmer.location,
    deliveryOptions: deliveryOptions ? JSON.parse(deliveryOptions) : { available: false },
    pickupAvailable: pickupAvailable === "true",
    // Handle images later with cloudinary
    images: req.files ? req.files.map((file) => file.path) : ["default-product.jpg"],
  })

  if (product) {
    res.status(201).json(product)
  } else {
    res.status(400)
    throw new Error("Invalid product data")
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Farmer
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  // Check if the user is the farmer who created the product
  if (product.farmer.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403)
    throw new Error("Not authorized to update this product")
  }

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

  res.json(updatedProduct)
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  // Check if the user is the farmer who created the product
  if (product.farmer.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403)
    throw new Error("Not authorized to delete this product")
  }

  await product.remove()

  res.json({ message: "Product removed" })
})

// @desc    Get farmer's products
// @route   GET /api/products/farmer
// @access  Private/Farmer
const getFarmerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ farmer: req.user.id })

  res.json(products)
})

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private/Buyer
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  // Check if the user already reviewed the product
  const alreadyReviewed = product.ratings.find((r) => r.user.toString() === req.user.id.toString())

  if (alreadyReviewed) {
    res.status(400)
    throw new Error("Product already reviewed")
  }

  const review = {
    user: req.user.id,
    rating: Number(rating),
    comment,
  }

  product.ratings.push(review)

  await product.save()

  res.status(201).json({ message: "Review added" })
})

// @desc    Approve a product (admin only)
// @route   PUT /api/products/:id/approve
// @access  Private/Admin
const approveProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  product.isApproved = true

  const updatedProduct = await product.save()

  res.json(updatedProduct)
})

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
  createProductReview,
  approveProduct,
}
