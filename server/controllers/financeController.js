import Transaction from "../models/Finance.js";

export const getFinanceData = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user's ID

    // Aggregate total income and expense for the user
    const income = await Transaction.aggregate([
      { $match: { user_id: userId, category: "Income" } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    const expense = await Transaction.aggregate([
      { $match: { user_id: userId, category: "Expense" } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    // Extract values (default to 0 if no records)
    const totalIncome = income.length > 0 ? income[0].totalIncome : 0;
    const totalExpense = expense.length > 0 ? expense[0].totalExpense : 0;
    const netBalance = totalIncome - totalExpense;

    res.status(200).json({ totalIncome, totalExpense, netBalance });
  } catch (error) {
    console.error("Error fetching financial data:", error);
    res.status(500).json({ message: "Server error while fetching data" });
  }
};
