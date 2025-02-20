import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { AttachMoney, MoneyOff, AccountBalance } from "@mui/icons-material";
import axios from "axios";
import Graph from "./Graph.jsx"; 

const Content = () => {
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/finance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFinancialData(response.data);
      } catch (error) {
        console.error("Error fetching financial data", error);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Total Income",
      amount: financialData.totalIncome,
      icon: <AttachMoney sx={{ fontSize: 50, color: "white" }} />,
      gradient: "linear-gradient(135deg, #32CD32, #228B22)",
    },
    {
      title: "Total Expense",
      amount: financialData.totalExpense,
      icon: <MoneyOff sx={{ fontSize: 50, color: "white" }} />,
      gradient: "linear-gradient(135deg, #FF4500, #B22222)",
    },
    {
      title: "Net Balance",
      amount: financialData.netBalance,
      icon: <AccountBalance sx={{ fontSize: 50, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1E90FF, #00008B)",
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
                height: 180,
                borderRadius: 4,
                background: card.gradient,
                color: "white",
                textAlign: "center",
              }}
            >
              {card.icon}
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                {card.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
                ₹{card.amount.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Graph Component Below */}
      <Graph
        totalIncome={financialData.totalIncome}
        totalExpense={financialData.totalExpense}
      />
    </Box>
  );
};

export default Content;
