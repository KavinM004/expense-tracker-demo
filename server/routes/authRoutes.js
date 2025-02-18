const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController"); // Correct path to your controller

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route to get user profile, requires authentication
router.get("/profile", authMiddleware, getUser);

// Route to request password reset (send email with token)
router.post("/forgot-password", forgotPassword);

// Route to reset password using the token
router.post("/reset-password", resetPassword);

module.exports = router;
