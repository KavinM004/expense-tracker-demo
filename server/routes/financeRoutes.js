import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getFinanceData } from "../controllers/financeController.js";

const router = express.Router();

// Route to get financial data (total income, expense, net balance)
router.get("/finance", authenticate, getFinanceData);

export default router;
