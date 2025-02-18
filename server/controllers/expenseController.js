import Expense from "../models/Expense.js";
import User from "../models/User.js"; // Import User model to fetch username
import generatePDF from "../utils/generatePDF.js";

// ✅ Add a new expense
export const addExpense = async (req, res) => {
  try {
    const { category, amount, description } = req.body;
    const userId = req.user.userId; // Extracted from JWT token

    if (!category || !amount) {
      return res
        .status(400)
        .json({ message: "Category and amount are required." });
    }

    if (!["Income", "Expense"].includes(category)) {
      return res
        .status(400)
        .json({ message: "Category must be either 'Income' or 'Expense'." });
    }

    const newExpense = new Expense({
      user: userId,
      category,
      amount,
      description,
    });

    await newExpense.save();

    res.status(201).json({
      message: `${category} added successfully.`,
      expense: newExpense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
};

// ✅ Get all expenses of the logged-in user
export const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenses = await Expense.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching expenses", error: error.message });
  }
};

// ✅ Delete a specific expense
export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const userId = req.user.userId;

    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      user: userId,
    });

    if (!deletedExpense) {
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized to delete." });
    }

    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
};

// ✅ Generate and download monthly expense report as a PDF
export const downloadExpenseReport = async (req, res) => {
  try {
    let { month, year } = req.query;
    const userId = req.user.userId;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required." });
    }

    // Ensure month is two digits (e.g., 1 -> 01, 2 -> 02)
    month = month.padStart(2, "0");

    // Fetch username from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const expenses = await Expense.find({
      user: userId,
      createdAt: {
        $gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
        $lt: new Date(`${year}-${month}-31T23:59:59.999Z`),
      },
    }).sort({ createdAt: -1 });

    if (!expenses.length) {
      return res
        .status(404)
        .json({ message: "No expenses found for this month and year." });
    }

    // Generate the PDF with the fetched username
    const pdfBuffer = await generatePDF(expenses, user.username, month, year);

    // Correct response headers for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Expense_Report_${month}_${year}.pdf`
    );

    // Send PDF buffer directly
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating report:", error);
    res
      .status(500)
      .json({ message: "Error generating report", error: error.message });
  }
};

