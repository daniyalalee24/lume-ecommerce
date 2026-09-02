const dotenv = require("dotenv");

// Load environment variables from .env file

dotenv.config();

const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const connectDB = require("./config/db");

// Import route files

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

const app = express();

// Middleware
app.use(
  cors({
    // .trim() removes any accidental invisible spaces/newlines
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.trim() : "",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes); // Use the auth routes for the /api/auth endpoint
app.use("/api/admin", adminRoutes); // Use the admin routes for the /api/admin endpoint
app.use("/api/orders", orderRoutes); // Use the order routes for the /api/orders endpoint
app.use("/api/products", productRoutes); // Use the product routes for the /api/products endpoint
app.use("/api/upload", uploadRoutes); // Use the upload routes for the /api/upload endpoint

// Define a simple route to check if the server is running

app.get("/", (req, res) => {
  res.json({ message: "LUMÉ API is running!" });
});

// 404 for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Centralized error handler — catches anything passed to next(err)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
