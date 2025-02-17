const Expense = require("../models/Expense");
const fs = require("fs");
const generatePDF = require("../utils/generatePDF");

// ✅ Add Expense (Fixed Dynamic Message)
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and Category are required" });
    }

    if (!["Income", "Expense"].includes(category)) {
      return res
        .status(400)
        .json({ message: "Invalid category. Choose 'Income' or 'Expense'" });
    }

    const newExpense = new Expense({
      userId: req.user.id,
      amount,
      category,
      description,
    });

    await newExpense.save();

    res.status(201).json({
      message: `${category} added successfully`,
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Generate & Download Expense Report (Fixed)
exports.downloadExpenseReport = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    const expenses = await Expense.find({
      userId,
      createdAt: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${month}-31`),
      },
    });

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for the given month." });
    }

    const filePath = await generatePDF(expenses, req.user.name, month, year);

    res.download(filePath, `Expense_Report_${month}_${year}.pdf`, (err) => {
      if (err) {
        console.error("Error downloading PDF:", err);
        return res.status(500).json({ message: "Error downloading PDF" });
      }
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
