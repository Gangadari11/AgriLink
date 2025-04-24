const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      required: [true, "Please add a unit"],
      enum: ["kg", "g", "item", "bundle", "box"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      min: [0, "Quantity cannot be negative"],
    },
    minimumOrder: {
      type: Number,
      default: 1,
      min: [1, "Minimum order must be at least 1"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["vegetables", "fruits", "grains", "spices", "other"],
    },
    images: {
      type: [String],
      default: ["default-product.jpg"],
    },
    features: {
      type: [String],
      default: [],
    },
    organic: {
      type: Boolean,
      default: false,
    },
    harvestDate: {
      type: Date,
      required: [true, "Please add a harvest date"],
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    deliveryOptions: {
      available: {
        type: Boolean,
        default: false,
      },
      fee: {
        type: Number,
        default: 0,
      },
      freeDeliveryMinimum: {
        type: Number,
        default: 0,
      },
      areas: {
        type: [String],
        default: [],
      },
    },
    pickupAvailable: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Calculate average rating when ratings are modified
productSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => item.rating + acc, 0) / this.ratings.length
    this.numReviews = this.ratings.length
  }
  next()
})

module.exports = mongoose.model("Product", productSchema)