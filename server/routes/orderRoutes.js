const express = require("express");

// Import controller functions
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

// Import authentication middleware
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/orders
router.post("/", protect, createOrder); // @route   GET /api/orders/my-orders
router.get("/my-orders", protect, getMyOrders); // @route   GET /api/orders

// admin only
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;
