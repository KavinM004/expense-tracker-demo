const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = async (expenses, userName, month, year) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30, size: "A4" });
      const fileName = `Expense_Report_${month}_${year}.pdf`;
      const filePath = path.join(__dirname, "../reports", fileName);

      if (!fs.existsSync(path.join(__dirname, "../reports"))) {
        fs.mkdirSync(path.join(__dirname, "../reports"), { recursive: true });
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.font("Helvetica");
      doc
        .font("Times-Bold")
        .fontSize(24)
        .text(`Expense Report for ${month}/${year}`, { align: "center" });
      doc.moveDown(1);
      doc.font("Helvetica-BoldOblique").fontSize(15).text(`Dear ${userName},`);
      doc.moveDown(1.5);

      const columnWidth = 120;
      const startX = 50;
      let startY = doc.y;

      const headers = ["Date", "Category", "Description", "Amount"];
      doc.font("Helvetica-Bold").fontSize(13);

      headers.forEach((header, i) => {
        const columnColor = i % 2 === 0 ? "#e6e6e6" : "#d9d9d9";
        doc
          .rect(startX + i * columnWidth, startY - 2, columnWidth, 26)
          .fill(columnColor)
          .stroke();
        doc
          .fillColor("black")
          .text(header, startX + i * columnWidth, startY + 6, {
            width: columnWidth,
            align: "center",
          });
      });

      doc.moveDown(0.5);
      doc.font("Helvetica").fontSize(12);

      let totalIncome = 0,
        totalExpense = 0;
      let yPosition = doc.y + 8;

      expenses.forEach((expense, index) => {
        const rowColor = index % 2 === 0 ? "#f8f8f8" : "#ffffff";
        doc
          .rect(startX, yPosition - 2, columnWidth * 4, 26)
          .fill(rowColor)
          .stroke("#000000");
        doc.fillColor("black");

        const formattedDate = new Date(expense.createdAt).toLocaleDateString(
          "en-GB"
        );
        doc.text(formattedDate, startX + 5, yPosition, {
          width: columnWidth - 10,
          align: "left",
        });
        doc.text(expense.category, startX + columnWidth + 5, yPosition, {
          width: columnWidth - 10,
          align: "left",
        });

        doc.text(
          expense.description || "N/A",
          startX + columnWidth * 2 + 5,
          yPosition,
          {
            width: columnWidth - 10,
            align: "left",
          }
        );

        let amount = parseFloat(expense.amount);
        if (isNaN(amount)) {
          console.error(`Invalid amount detected: ${expense.amount}`);
          amount = 0;
        }

        if (expense.category.toLowerCase() === "income") {
          doc.fillColor("#008000");
          totalIncome += amount;
        } else {
          doc.fillColor("#FF0000");
          totalExpense += amount;
        }

        doc.text(
          `${amount.toFixed(2)}`.replace(/^1(?=\d)/, ""),
          startX + columnWidth * 3 + 5,
          yPosition,
          { width: columnWidth - 10, align: "right" }
        );
        doc.fillColor("black");

        yPosition += 30;
      });

      doc.moveDown(1.5);
      doc.font("Helvetica-Bold").fontSize(14);
      doc
        .rect(startX, yPosition - 2, columnWidth * 4, 26)
        .fill("#dddddd")
        .stroke("#000000");
      doc.fillColor("black");

      doc.text("Total Income:", startX + 5, yPosition + 5, {
        width: columnWidth - 10,
        align: "left",
      });
      doc.text("Total Expenses:", startX + columnWidth * 2 + 5, yPosition + 5, {
        width: columnWidth - 10,
        align: "left",
      });

      doc
        .fillColor("#008000")
        .text(
          `${totalIncome.toFixed(2)}`,
          startX + columnWidth + 5,
          yPosition + 5,
          { width: columnWidth - 10, align: "left" }
        );
      doc
        .fillColor("#FF0000")
        .text(
          `${totalExpense.toFixed(2)}`,
          startX + columnWidth * 3 + 5,
          yPosition + 5,
          { width: columnWidth - 10, align: "right" }
        );

      doc.fillColor("black");
      yPosition += 32;

      doc
        .rect(startX, yPosition - 2, columnWidth * 4, 26)
        .fill("#d1ecf1")
        .stroke("#000000");
      doc.fillColor("black");
      doc.text("Net Balance:", startX + 5, yPosition + 5, {
        width: columnWidth - 10,
        align: "left",
      });

      doc
        .fillColor("#0000FF")
        .text(
          `${(totalIncome - totalExpense).toFixed(2)}`,
          startX + columnWidth + 5,
          yPosition + 5,
          { width: columnWidth - 10, align: "left" }
        );

      doc.fillColor("black");
      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generatePDF;
