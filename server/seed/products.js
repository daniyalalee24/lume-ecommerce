const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const products = [
  {
    name: "Oversized T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Essential Hoodie",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Straight Leg Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Minimal Bomber Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Linen Summer Dress",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Knit Sweater",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Wide-Leg Trousers",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Classic Denim Jacket",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Canvas Tote Bag",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Classic Baseball Cap",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=85",
  },
];

const updateProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    let updated = 0;
    let notFound = 0;

    for (const product of products) {
      const result = await Product.updateOne(
        { name: product.name },
        { $set: { image: product.image } },
      );

      if (result.matchedCount > 0) {
        updated++;
        console.log(`Updated image: ${product.name}`);
      } else {
        notFound++;
        console.warn(`Product not found: ${product.name}`);
      }
    }

    console.log(`\nImage update complete.`);
    console.log(`Products updated: ${updated}`);
    console.log(`Products not found: ${notFound}`);
  } catch (error) {
    console.error("Failed to update product images:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

updateProductImages();
