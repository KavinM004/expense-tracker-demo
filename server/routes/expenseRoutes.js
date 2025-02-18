const express = require("express");
const {
  getExpenses,
  addExpense,
  generatePDF,
} = require("../controllers/expenseController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getExpenses);
router.post("/", authMiddleware, addExpense);
router.get("/download", authMiddleware, generatePDF);

module.exports = router;
