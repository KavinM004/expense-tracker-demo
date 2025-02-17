import React, { useContext, memo, useCallback } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpenseContext } from "../context/ExpenseContext";
import { AuthContext } from "../context/AuthContext";
import { deleteExpense } from "../utils/api";

const ExpenseItem = ({ expense }) => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { auth } = useContext(AuthContext);

  const handleDelete = useCallback(async () => {
    try {
      await deleteExpense(expense._id, auth?.token);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((item) => item._id !== expense._id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }, [expense._id, auth?.token, setExpenses]);

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={`${expense.category}: $${expense.amount}`}
        secondary={expense.description}
      />
    </ListItem>
  );
};

export default memo(ExpenseItem);
