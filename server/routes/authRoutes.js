const express = require("express");

const { validateSignup, validateLogin } = require("../middleware/validators");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

module.exports = router;
