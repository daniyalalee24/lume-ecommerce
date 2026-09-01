const express = require("express");
const upload = require("../middleware/upload");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  res.json({ imageUrl: req.file.path }); // Cloudinary's hosted URL
});

module.exports = router;
