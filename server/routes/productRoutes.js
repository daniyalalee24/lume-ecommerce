const express = require("express");

// Import controller functions
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Import authentication middleware
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router(); // Create a new router instance

// Define routes for product-related endpoints
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
