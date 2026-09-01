const Product = require("../models/Product");

// @desc    Get all products
const getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;

    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" }; // case-insensitive partial match

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.json({
      products,
      page: pageNumber,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts,
    });
  } catch (error) {
    console.error("Get products error:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// @desc    Get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

// @desc    Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image, sizes } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
      sizes,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

// @desc    Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

// @desc    Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

// Export the controller functions
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
