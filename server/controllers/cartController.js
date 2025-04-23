const asyncHandler = require("express-async-handler")
const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private/Buyer
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: "items.product",
    select: "name price images farmer farmerName location",
  })

  if (!cart) {
    // Create a new cart if none exists
    cart = await Cart.create({
      user: req.user.id,
      items: [],
    })
  }

  // Calculate total items and amount
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  res.json({
    items: cart.items,
    totalItems,
    totalAmount,
  })
})

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private/Buyer
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body

  // Validate product
  const product = await Product.findById(productId)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  // Check if quantity is valid
  if (quantity <= 0) {
    res.status(400)
    throw new Error("Quantity must be greater than 0")
  }

  // Check if product is in stock
  if (product.quantity < quantity) {
    res.status(400)
    throw new Error("Not enough stock available")
  }

  // Get user cart
  let cart = await Cart.findOne({ user: req.user.id })

  if (!cart) {
    // Create a new cart if none exists
    cart = await Cart.create({
      user: req.user.id,
      items: [],
    })
  }

  // Check if product already exists in cart
  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

  if (itemIndex > -1) {
    // Update quantity if product exists
    cart.items[itemIndex].quantity += quantity
  } else {
    // Add new item if product doesn't exist
    cart.items.push({
      product: productId,
      quantity,
    })
  }

  // Save cart
  await cart.save()

  // Return updated cart
  cart = await Cart.findOne({ user: req.user.id }).populate({
    path: "items.product",
    select: "name price images farmer farmerName location",
  })

  // Calculate total items and amount
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  res.status(201).json({
    items: cart.items,
    totalItems,
    totalAmount,
  })
})

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private/Buyer
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body
  const { productId } = req.params

  // Validate quantity
  if (quantity <= 0) {
    res.status(400)
    throw new Error("Quantity must be greater than 0")
  }

  // Get user cart
  let cart = await Cart.findOne({ user: req.user.id })

  if (!cart) {
    res.status(404)
    throw new Error("Cart not found")
  }

  // Find item in cart
  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

  if (itemIndex === -1) {
    res.status(404)
    throw new Error("Item not found in cart")
  }

  // Check if product has enough stock
  const product = await Product.findById(productId)

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  if (product.quantity < quantity) {
    res.status(400)
    throw new Error("Not enough stock available")
  }

  // Update quantity
  cart.items[itemIndex].quantity = quantity

  // Save cart
  await cart.save()

  // Return updated cart
  cart = await Cart.findOne({ user: req.user.id }).populate({
    path: "items.product",
    select: "name price images farmer farmerName location",
  })

  // Calculate total items and amount
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  res.json({
    items: cart.items,
    totalItems,
    totalAmount,
  })
})

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private/Buyer
const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params

  // Get user cart
  const cart = await Cart.findOne({ user: req.user.id })

  if (!cart) {
    res.status(404)
    throw new Error("Cart not found")
  }

  // Remove item from cart
  cart.items = cart.items.filter((item) => item.product.toString() !== productId)

  // Save cart
  await cart.save()

  res.json({ message: "Item removed from cart" })
})

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private/Buyer
const clearCart = asyncHandler(async (req, res) => {
  // Get user cart
  const cart = await Cart.findOne({ user: req.user.id })

  if (!cart) {
    res.status(404)
    throw new Error("Cart not found")
  }

  // Clear cart items
  cart.items = []

  // Save cart
  await cart.save()

  res.json({ message: "Cart cleared" })
})

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
}
