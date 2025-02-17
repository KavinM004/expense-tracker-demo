import React, { useContext, memo } from "react";
import ExpenseItem from "./ExpenseItem";
import { ExpenseContext } from "../context/ExpenseContext";
import { List, Typography } from "@mui/material";

const ExpenseList = () => {
  const { expenses } = useContext(ExpenseContext);

  if (!expenses.length) {
    return (
      <Typography variant="h6" align="center">
        No expenses recorded.
      </Typography>
    );
  }

  return (
    <List>
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} />
      ))}
    </List>
  );
};

export default memo(ExpenseList);
