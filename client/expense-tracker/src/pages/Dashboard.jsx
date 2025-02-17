import React, { memo } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { Container, Typography, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <ExpenseForm />
        <ExpenseList />
      </Box>
    </Container>
  );
};

export default memo(Dashboard);
