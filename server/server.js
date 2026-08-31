const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import route files

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Load environment variables from .env file

dotenv.config();

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

// Define a simple route to check if the server is running

app.get("/", (req, res) => {
  res.json({ message: "LUMÉ API is running!" });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
