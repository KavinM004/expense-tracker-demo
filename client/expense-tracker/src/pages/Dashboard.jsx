import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Grid, Container, useMediaQuery } from "@mui/material";

const MobileLayout = ({ expenses, addExpense, deleteExpense }) => {
  return (
    <div>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
};

const DesktopLayout = ({ expenses, addExpense, deleteExpense }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <ExpenseForm addExpense={addExpense} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      </Grid>
    </Grid>
  );
};

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    axios
      .get("/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const addExpense = (expense) => {
    axios
      .post("/api/expenses/add", expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses([...expenses, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteExpense = (id) => {
    axios
      .delete(`/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(expenses.filter((expense) => expense._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {isMobile ? (
          <MobileLayout
            expenses={expenses}
            addExpense={addExpense}
            deleteExpense={deleteExpense}
          />
        ) : (
          <DesktopLayout
            expenses={expenses}
            addExpense={addExpense}
            deleteExpense={deleteExpense}
          />
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
