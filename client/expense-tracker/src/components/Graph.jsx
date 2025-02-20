// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { Paper, Typography, Box } from "@mui/material";

// const Graph = ({ totalIncome, totalExpense }) => {
//   const data = [
//     { name: "Income", value: totalIncome },
//     { name: "Expense", value: totalExpense },
//   ];

//   return (
//     <Paper elevation={6} sx={{ mt: 4, p: 3, borderRadius: 4 }}>
//       <Typography
//         variant="h6"
//         sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
//       >
//         Income vs Expense
//       </Typography>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="value" fill="#4CAF50" name="Income" />
//           <Bar dataKey="value" fill="#FF5722" name="Expense" />
//         </BarChart>
//       </ResponsiveContainer>
//     </Paper>
//   );
// };

// export default Graph;

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const Graph = ({ totalIncome, totalExpense }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // Generate random values if API data is unavailable
    const incomeValue = totalIncome || Math.floor(Math.random() * 10000) + 1000;
    const expenseValue = totalExpense || Math.floor(Math.random() * 8000) + 500;

    setGraphData([
      { name: "Income", value: incomeValue, color: "#4CAF50" },
      { name: "Expense", value: expenseValue, color: "#FF5722" },
    ]);
  }, [totalIncome, totalExpense]);

  return (
    <Paper elevation={6} sx={{ mt: 4, p: 3, borderRadius: 4 }}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        Income vs Expense
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={graphData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4CAF50" name="Income" />
          <Bar dataKey="value" fill="#FF5722" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Graph;

