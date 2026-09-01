const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

const validateSignup = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors,
];

const validateLogin = [
  body("email").isEmail().withMessage("A valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const validateProduct = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("category")
    .isIn(["Men", "Women", "Accessories"])
    .withMessage("Invalid category"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be zero or greater"),
  handleValidationErrors,
];

module.exports = { validateSignup, validateLogin, validateProduct };
