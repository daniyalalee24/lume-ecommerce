const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  // Middleware to protect routes and ensure the user is authenticated
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with "Bearer "

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Extract the token from the Authorization header

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        // Changed status code to 401 for unauthorized access
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const admin = (req, res, next) => {
  // Middleware to check if the user is an admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      message: "Admin access required",
    });
  }
};

module.exports = { protect, admin };
