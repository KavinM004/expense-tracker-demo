const db = require("../config/db");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.getExpenses = (req, res) => {
  db.query(
    "SELECT * FROM expenses WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server Error" });
      res.json(results);
    }
  );
};

exports.addExpense = (req, res) => {
  const { amount, category, description } = req.body;
  db.query(
    "INSERT INTO expenses (user_id, amount, category, description) VALUES (?, ?, ?, ?)",
    [req.user.id, amount, category, description],
    (err) => {
      if (err) return res.status(500).json({ message: "Error adding expense" });
      res.json({ message: "Expense added" });
    }
  );
};

exports.generatePDF = (req, res) => {
  db.query(
    "SELECT * FROM expenses WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server Error" });

      const doc = new PDFDocument();
      const filename = `expenses_${req.user.id}.pdf`;
      const filepath = `./downloads/${filename}`;

      doc.pipe(fs.createWriteStream(filepath));
      doc.text("Monthly Expense Report", { align: "center" });

      results.forEach((exp) => {
        doc.text(
          `Amount: ${exp.amount}, Category: ${exp.category}, Description: ${exp.description}`
        );
      });

      doc.end();
      res.download(filepath);
    }
  );
};
