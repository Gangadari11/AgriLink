const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const Cart = require("../models/cartModel")

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Buyer
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
  }

  // Create order
  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })

  // Update product quantities
  for (const item of orderItems) {
    const product = await Product.findById(item.product)

    if (product) {
      product.quantity -= item.quantity
      await product.save()
    }
  }

  // Clear cart after order is created
  await Cart.findOneAndUpdate({ user: req.user.id }, { $set: { items: [] } })

  res.status(201).json(order)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")

  if (!order) {
    res.status(404)
    throw new Error("Order not found")
  }

  // Check if the user is authorized to view this order
  if (
    order.user._id.toString() !== req.user.id &&
    req.user.role !== "admin" &&
    !order.items.some((item) => item.farmer.toString() === req.user.id)
  ) {
    res.status(403)
    throw new Error("Not authorized to view this order")
  }

  res.json(order)
})

// @desc    Get logged in user orders
// @route   GET /api/orders/user
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  let orders

  if (req.user.role === "buyer") {
    // Get buyer's orders
    orders = await Order.find({ user: req.user.id })
  } else if (req.user.role === "farmer") {
    // Get orders containing farmer's products
    orders = await Order.find({
      "items.farmer": req.user.id,
    })
  }

  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name")
  res.json(orders)
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Farmer or Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body

  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error("Order not found")
  }

  // Check if the user is authorized to update this order
  if (req.user.role !== "admin" && !order.items.some((item) => item.farmer.toString() === req.user.id)) {
    res.status(403)
    throw new Error("Not authorized to update this order")
  }

  // Update status
  order.status = status

  // If status is delivered, set deliveredAt
  if (status === "Delivered") {
    order.deliveredAt = Date.now()
  }

  const updatedOrder = await order.save()

  res.json(updatedOrder)
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error("Order not found")
  }

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  }

  const updatedOrder = await order.save()

  res.json(updatedOrder)
})

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  getOrders,
  updateOrderStatus,
  updateOrderToPaid,
}
