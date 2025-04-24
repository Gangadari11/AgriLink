const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]
      console.log("Received token:", token); // Log the token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as an admin")
  }
}

// Farmer middleware
const farmer = (req, res, next) => {
  if (req.user && req.user.role === "farmer") {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as a farmer")
  }
}

// Buyer middleware
const buyer = (req, res, next) => {
  if (req.user && req.user.role === "buyer") {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as a buyer")
  }
}

// Farmer or Admin middleware
const farmerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "farmer" || req.user.role === "admin")) {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as a farmer or admin")
  }
}

module.exports = { protect, admin, farmer, buyer, farmerOrAdmin }
