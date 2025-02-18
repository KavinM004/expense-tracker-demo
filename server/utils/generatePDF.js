import PDFDocument from "pdfkit";

const generatePDF = async (expenses, userNameFromDB, month, year) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30, size: "A4" });

      // Store PDF in memory
      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // Ensure username is properly set
      const userName = userNameFromDB || "User";

      // Title
      doc
        .font("Times-Bold")
        .fontSize(24)
        .text(`Expense Report for ${month}/${year}`, { align: "center" });
      doc.moveDown(1);
      doc.font("Helvetica-BoldOblique").fontSize(15).text(`Dear ${userName},`);
      doc.moveDown(1.5);

      // Table Headers with different background colors
      const columnWidth = 120;
      const rowHeight = 30; // Increase row height for padding effect
      const startX = 50;
      let startY = doc.y;
      const headers = ["Date", "Category", "Description", "Amount"];
      const headerColors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc"];

      doc.font("Helvetica-Bold").fontSize(13);
      headers.forEach((header, i) => {
        doc
          .rect(startX + i * columnWidth, startY - 2, columnWidth, rowHeight)
          .fill(headerColors[i])
          .stroke("#000000");
        doc
          .fillColor("black")
          .text(header, startX + i * columnWidth, startY + 6, {
            width: columnWidth,
            align: "center",
          });
      });

      doc.moveDown(0.5);
      doc.font("Helvetica-Bold").fontSize(12); // ✅ Semi-bold text for table data

      // Table Rows with column background colors
      let totalIncome = 0,
        totalExpense = 0;
      let yPosition = doc.y + 8;

      expenses.forEach((expense) => {
        const formattedDate = new Date(expense.createdAt).toLocaleDateString(
          "en-GB"
        );
        let amount = parseFloat(expense.amount) || 0;

        // Set background color for each column
        doc
          .rect(startX, yPosition - 2, columnWidth, rowHeight)
          .fill("#f8f9fa")
          .stroke();
        doc
          .rect(startX + columnWidth, yPosition - 2, columnWidth, rowHeight)
          .fill("#e9ecef")
          .stroke();
        doc
          .rect(startX + columnWidth * 2, yPosition - 2, columnWidth, rowHeight)
          .fill("#dee2e6")
          .stroke();
        doc
          .rect(startX + columnWidth * 3, yPosition - 2, columnWidth, rowHeight)
          .fill("#ced4da")
          .stroke();

        // ✅ Apply top padding (Move text slightly downward)
        doc.fillColor("black").font("Helvetica-Bold");
        doc.text(formattedDate, startX + 5, yPosition + 6, {
          width: columnWidth - 10,
          align: "center",
        });
        doc.text(expense.category, startX + columnWidth + 5, yPosition + 6, {
          width: columnWidth - 10,
          align: "center",
        });
        doc.text(
          expense.description || "N/A",
          startX + columnWidth * 2 + 5,
          yPosition + 6,
          {
            width: columnWidth - 10,
            align: "center",
          }
        );

        if (expense.category.toLowerCase() === "income") {
          totalIncome += amount;
          doc.fillColor("#008000");
        } else {
          totalExpense += amount;
          doc.fillColor("#FF0000");
        }

        doc.text(
          amount.toFixed(2),
          startX + columnWidth * 3 + 5,
          yPosition + 6,
          {
            width: columnWidth - 10,
            align: "center",
          }
        );

        doc.fillColor("black");
        yPosition += rowHeight;
      });

      // Totals Row
      doc.moveDown(1.5);
      doc.font("Helvetica-Bold").fontSize(14);
      doc
        .rect(startX, yPosition - 2, columnWidth * 4, rowHeight)
        .fill("#d6d8db")
        .stroke();
      doc.fillColor("black");

      doc.text("Total Income:", startX + 5, yPosition + 6, {
        width: columnWidth - 10,
        align: "center",
      });
      doc.text("Total Expenses:", startX + columnWidth * 2 + 5, yPosition + 6, {
        width: columnWidth - 10,
        align: "center",
      });

      doc
        .fillColor("#008000")
        .text(totalIncome.toFixed(2), startX + columnWidth + 5, yPosition + 6, {
          width: columnWidth - 10,
          align: "center",
        });
      doc
        .fillColor("#FF0000")
        .text(
          totalExpense.toFixed(2),
          startX + columnWidth * 3 + 5,
          yPosition + 6,
          {
            width: columnWidth - 10,
            align: "center",
          }
        );

      // ✅ Fix Net Balance Row Position
      yPosition += rowHeight;
      doc
        .fillColor("black")
        .rect(startX, yPosition - 2, columnWidth * 4, rowHeight)
        .fill("#d1ecf1")
        .stroke();

      // **Make sure "Net Balance" is properly positioned inside the row**
      doc
        .fillColor("black")
        .font("Helvetica-Bold")
        .text("Net Balance:", startX + 5, yPosition + 6, {
          width: columnWidth - 10,
          align: "center",
        });

      // **Ensure Net Balance amount aligns correctly**
      doc
        .fillColor("#0000FF")
        .text(
          (totalIncome - totalExpense).toFixed(2),
          startX + columnWidth + 5,
          yPosition + 6,
          {
            width: columnWidth - 10,
            align: "center",
          }
        );

      doc.fillColor("black");
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default generatePDF;
