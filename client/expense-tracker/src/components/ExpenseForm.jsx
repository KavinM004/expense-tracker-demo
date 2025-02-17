import React, { useState, useContext, useCallback } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { AuthContext } from "../context/AuthContext";
import { Container, TextField, Button, Alert } from "@mui/material";
import { addExpense } from "../utils/api";

const ExpenseForm = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.category || !formData.amount) {
        setError("Category and Amount are required.");
        return;
      }

      try {
        const { data } = await addExpense(formData, auth.token);
        setExpenses((prevExpenses) => [...prevExpenses, data]);
        setFormData({ category: "", amount: "", description: "" }); // Reset form after submission
        setError(""); // Clear errors if successful
      } catch (err) {
        setError("Failed to add expense. Please try again.");
      }
    },
    [formData, auth.token, setExpenses]
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Category"
          name="category"
          margin="normal"
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Amount"
          name="amount"
          type="number"
          margin="normal"
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Expense
        </Button>
      </form>
    </Container>
  );
};

export default ExpenseForm;
