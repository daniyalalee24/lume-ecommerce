const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const products = [
  {
    name: "Oversized T-Shirt",
    description:
      "A relaxed-fit cotton t-shirt designed for everyday comfort and effortless style.",
    price: 2999,
    category: "Men",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjKdGUJArXsikTQmCYlyL1N754QpjHvG2Kma9loKUoFe_OkHBSAcVS4bQ1&s=10",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },

  {
    name: "Essential Hoodie",
    description:
      "A soft everyday hoodie with a clean silhouette and comfortable fit.",
    price: 5499,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
  },

  {
    name: "Straight Leg Jeans",
    description: "Classic straight-leg denim with a timeless everyday fit.",
    price: 6999,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    sizes: ["30", "32", "34", "36"],
    stock: 20,
  },

  {
    name: "Minimal Bomber Jacket",
    description:
      "A clean modern bomber jacket perfect for layering during cooler days.",
    price: 8999,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
  },

  {
    name: "Linen Summer Dress",
    description:
      "A lightweight linen dress with a relaxed silhouette for warm days.",
    price: 6499,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    stock: 15,
  },

  {
    name: "Knit Sweater",
    description:
      "A soft textured knit sweater designed for a comfortable layered look.",
    price: 5999,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    stock: 14,
  },

  {
    name: "Wide-Leg Trousers",
    description:
      "Relaxed wide-leg trousers with a clean and elegant silhouette.",
    price: 6299,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    stock: 16,
  },

  {
    name: "Classic Denim Jacket",
    description:
      "A versatile denim jacket that works effortlessly across seasons.",
    price: 7499,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    stock: 10,
  },

  {
    name: "Canvas Tote Bag",
    description:
      "A simple everyday canvas tote with plenty of room for your essentials.",
    price: 2499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    sizes: [],
    stock: 30,
  },

  {
    name: "Classic Baseball Cap",
    description: "A minimal six-panel cap with an adjustable back strap.",
    price: 1999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
    sizes: [],
    stock: 35,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("10 products inserted successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
