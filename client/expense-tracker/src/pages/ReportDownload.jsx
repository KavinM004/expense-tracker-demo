import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  MenuItem,
} from "@mui/material";
import { Download, CalendarToday, DateRange } from "@mui/icons-material";
import axios from "axios";

const ReportDownload = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const API_URL = "https://expense-tracker-demo-sanu.onrender.com"; // 🔹 Replace with actual backend URL

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const handleDownload = async () => {
    if (!month || !year) {
      alert("Please select both month and year.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/expenses/download-pdf?month=${month}&year=${year}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      // 🔹 Check if response is empty (No reports found)
      if (response.data.size === 0) {
        alert("No reports found for the selected month and year!");
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Expense_Report_${month}_${year}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading report:", error);

      // 🔹 Handle 404 (No records found)
      if (error.response && error.response.status === 404) {
        alert("No reports found for the selected month and year!");
      } else {
        alert("Failed to download the report. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "1px", paddingTop: "100px" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Download Expense Report
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Select Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            InputProps={{
              startAdornment: (
                <CalendarToday style={{ color: "#4A148C", marginRight: 8 }} />
              ),
            }}
          >
            {months.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Select Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            InputProps={{
              startAdornment: (
                <DateRange style={{ color: "#4A148C", marginRight: 8 }} />
              ),
            }}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Download style={{ color: "white" }} />}
            onClick={handleDownload}
            sx={{
              backgroundColor: "#4A148C", // Dark Purple
              color: "white",
              "&:hover": { backgroundColor: "#6A1B9A" }, // Lighter Purple on Hover
            }}
          >
            Download Report
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportDownload;
