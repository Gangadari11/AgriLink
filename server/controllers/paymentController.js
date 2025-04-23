const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")
const crypto = require("crypto")

// @desc    Process payment with PayHere
// @route   POST /api/payments/:orderId
// @access  Private/Buyer
const processPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId)

  if (!order) {
    res.status(404)
    throw new Error("Order not found")
  }

  // Check if the user is authorized to pay for this order
  if (order.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error("Not authorized")
  }

  // Check if order is already paid
  if (order.isPaid) {
    res.status(400)
    throw new Error("Order is already paid")
  }

  // Create PayHere payment data
  const paymentData = {
    merchant_id: process.env.PAYHERE_MERCHANT_ID,
    return_url: process.env.PAYHERE_RETURN_URL,
    cancel_url: process.env.PAYHERE_CANCEL_URL,
    notify_url: process.env.PAYHERE_NOTIFY_URL,
    order_id: order._id.toString(),
    items: order.items.map((item) => item.name).join(", "),
    amount: order.totalPrice.toString(),
    currency: "LKR",
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: order.shippingAddress.address,
    city: order.shippingAddress.city,
    country: "Sri Lanka",
  }

  // Generate hash for PayHere
  const hash = crypto
    .createHash("md5")
    .update(
      process.env.PAYHERE_MERCHANT_ID +
        order._id.toString() +
        paymentData.amount +
        "LKR" +
        process.env.PAYHERE_MERCHANT_SECRET,
    )
    .digest("hex")

  paymentData.hash = hash

  // Generate PayHere payment URL
  const paymentUrl = `https://sandbox.payhere.lk/pay/checkout?merchant_id=${paymentData.merchant_id}&return_url=${paymentData.return_url}&cancel_url=${paymentData.cancel_url}&notify_url=${paymentData.notify_url}&order_id=${paymentData.order_id}&items=${paymentData.items}&amount=${paymentData.amount}&currency=${paymentData.currency}&first_name=${paymentData.first_name}&last_name=${paymentData.last_name}&email=${paymentData.email}&phone=${paymentData.phone}&address=${paymentData.address}&city=${paymentData.city}&country=${paymentData.country}&hash=${paymentData.hash}`

  res.json({ paymentUrl })
})

// @desc    PayHere payment notification
// @route   POST /api/payments/notify
// @access  Public
const paymentNotification = asyncHandler(async (req, res) => {
  const { merchant_id, order_id, payment_id, payhere_amount, payhere_currency, status_code, md5sig } = req.body

  // Verify hash
  const localHash = crypto
    .createHash("md5")
    .update(
      merchant_id + order_id + payhere_amount + payhere_currency + status_code + process.env.PAYHERE_MERCHANT_SECRET,
    )
    .digest("hex")
    .toUpperCase()

  if (localHash !== md5sig) {
    res.status(400)
    throw new Error("Invalid hash")
  }

  // Update order payment status
  if (status_code === "2") {
    // Payment successful
    const order = await Order.findById(order_id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: payment_id,
        status: "COMPLETED",
        update_time: Date.now(),
        email_address: req.body.payhere_email || "",
      }

      await order.save()
    }
  }

  res.status(200).send("OK")
})

// @desc    Verify payment status
// @route   GET /api/payments/:orderId/status
// @access  Private
const verifyPaymentStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId)

  if (!order) {
    res.status(404)
    throw new Error("Order not found")
  }

  res.json({
    isPaid: order.isPaid,
    paidAt: order.paidAt,
    paymentResult: order.paymentResult,
  })
})

module.exports = {
  processPayment,
  paymentNotification,
  verifyPaymentStatus,
}
