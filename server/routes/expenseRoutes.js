const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  downloadExpenseReport,
} = require("../controllers/expenseController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// Add a new expense
router.post("/add", authMiddleware, addExpense);

// Get all user expenses
router.get("/", authMiddleware, getExpenses);

// Delete an expense
router.delete("/:id", authMiddleware, deleteExpense);

// Generate & Download PDF report (Fixed Route Path)
router.get("/report/download", authMiddleware, downloadExpenseReport);

module.exports = router;
