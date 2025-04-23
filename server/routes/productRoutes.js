const express = require("express")
const router = express.Router()
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
  createProductReview,
  approveProduct,
} = require("../controllers/productController")
const { protect, farmer, admin, farmerOrAdmin, buyer } = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware")

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: organic
 *         schema:
 *           type: boolean
 *         description: Filter by organic status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - unit
 *               - quantity
 *               - category
 *               - harvestDate
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               unit:
 *                 type: string
 *               quantity:
 *                 type: number
 *               minimumOrder:
 *                 type: number
 *               category:
 *                 type: string
 *               features:
 *                 type: string
 *               organic:
 *                 type: boolean
 *               harvestDate:
 *                 type: string
 *                 format: date
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               deliveryOptions:
 *                 type: string
 *               pickupAvailable:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid product data
 */
router.route("/").get(getProducts).post(protect, farmer, upload.array("images", 5), createProduct)

/**
 * @swagger
 * /api/products/farmer:
 *   get:
 *     summary: Get farmer's products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of farmer's products
 *       401:
 *         description: Not authorized
 */
router.route("/farmer").get(protect, farmer, getFarmerProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               unit:
 *                 type: string
 *               quantity:
 *                 type: number
 *               minimumOrder:
 *                 type: number
 *               category:
 *                 type: string
 *               features:
 *                 type: string
 *               organic:
 *                 type: boolean
 *               harvestDate:
 *                 type: string
 *                 format: date
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               deliveryOptions:
 *                 type: string
 *               pickupAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product removed
 *       404:
 *         description: Product not found
 */
router
  .route("/:id")
  .get(getProductById)
  .put(protect, farmerOrAdmin, upload.array("images", 5), updateProduct)
  .delete(protect, farmerOrAdmin, deleteProduct)

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Create product review
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added
 *       400:
 *         description: Product already reviewed
 */
router.route("/:id/reviews").post(protect, buyer, createProductReview)

/**
 * @swagger
 * /api/products/{id}/approve:
 *   put:
 *     summary: Approve a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product approved
 *       404:
 *         description: Product not found
 */
router.route("/:id/approve").put(protect, admin, approveProduct)

module.exports = router
