import express from "express";
import {
  addExpense,
  getAllExpenses,
  deleteExpense,
  downloadExpenseReport,
} from "../controllers/expenseController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authenticate, addExpense);
router.get("/all", authenticate, getAllExpenses);
router.delete("/:expenseId", authenticate, deleteExpense);
router.get("/download-pdf", authenticate, downloadExpenseReport);

export default router;
