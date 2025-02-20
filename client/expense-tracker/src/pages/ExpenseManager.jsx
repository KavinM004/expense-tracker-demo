import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputAdornment,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  AttachMoney,
  MoneyOff,
  Delete,
  AddCircle,
  Category,
  Notes,
  MonetizationOn,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const ExpenseManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://expense-tracker-demo-sanu.onrender.com/api/expenses/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!category || !amount || !description) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const newTransaction = {
        category,
        amount: parseFloat(amount),
        description,
      };
      await axios.post(
        "https://expense-tracker-demo-sanu.onrender.com/api/expenses/add",
        newTransaction,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTransactions();
      setCategory("");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "1px",
        paddingTop: "55px",
        paddingX: "20px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 2, fontFamily: "Poppins, sans-serif" }}
      >
        Expense Manager
      </Typography>

      {/* Input Fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          variant="outlined"
          fullWidth={isSmallScreen}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Category sx={{ color: "#8A2BE2" }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </TextField>
        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          variant="outlined"
          fullWidth={isSmallScreen}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOn sx={{ color: "#8A2BE2" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth={isSmallScreen}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Notes sx={{ color: "#8A2BE2" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{
            minWidth: 120,
            width: isSmallScreen ? "100%" : "auto",
            backgroundColor: "#8A2BE2",
            color: "white",
            "&:hover": { backgroundColor: "#5A189A" },
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontFamily: "Poppins, sans-serif",
          }}
          onClick={handleAddTransaction}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#5A189A" }} />
          ) : (
            <>
              <AddCircle sx={{ fontSize: 20 }} /> Add
            </>
          )}
        </Button>
      </Box>

      {/* Transactions Display */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress size={40} sx={{ color: "#5A189A" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {transactions.map((transaction) => (
            <motion.div
              key={transaction._id}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                sx={{
                  width: 250,
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 3,
                  background:
                    transaction.category === "Income" ? "#C8E6C9" : "#FFCDD2",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  {transaction.category === "Income" ? (
                    <AttachMoney sx={{ fontSize: 40, color: "#8A2BE2" }} />
                  ) : (
                    <MoneyOff sx={{ fontSize: 40, color: "#8A2BE2" }} />
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mt: 1,
                      fontFamily: "Playfair Display, serif",
                      color: "black",
                    }}
                  >
                    {transaction.category}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "Playfair Display, serif",
                      color: "black",
                    }}
                  >
                    ₹{transaction.amount}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "Merriweather, serif",
                      color: "black",
                    }}
                  >
                    {transaction.description}
                  </Typography>
                </CardContent>
                <IconButton
                  onClick={() => handleDeleteTransaction(transaction._id)}
                  sx={{ color: "#8A2BE2", "&:hover": { color: "red" } }}
                >
                  <Delete />
                </IconButton>
              </Card>
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ExpenseManager;
