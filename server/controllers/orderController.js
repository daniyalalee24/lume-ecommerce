const Order = require("../models/Order");

// @desc    Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (
      !items ||
      items.length === 0 ||
      !shippingAddress ||
      !paymentMethod ||
      !totalPrice
    ) {
      return res.status(400).json({
        message: "Please provide all order details",
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

// @desc    Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

// @desc    Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

// @desc    Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Allowed Statuses
    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    order.status = req.body.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};

// cancel order logic
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Check if the user owns this order, unless they are an admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message: "Not authorized to cancel this order",
      });
    }

    // Don't allow cancellation after shipping
    if (order.status === "Shipped" || order.status === "Delivered") {
      return res.status(400).json({
        message: "This order can no longer be cancelled",
      });
    }

    // Don't cancel an already cancelled order
    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "This order is already cancelled",
      });
    }

    order.status = "Cancelled";

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel order",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
