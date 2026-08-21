const express = require("express");

const { getAdminDashboard } = require("../controllers/adminController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// makes sure that only authenticated admin users can access the admin dashboard
router.get("/", protect, admin, getAdminDashboard);

module.exports = router;
