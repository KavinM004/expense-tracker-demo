import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getUserProfile);
router.post("/forgot-password", requestPasswordReset); // Send reset link
router.post("/reset-password/:token", resetPassword); // Reset password

export default router; // ✅ Ensure this is a default export
