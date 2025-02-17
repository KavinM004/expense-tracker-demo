const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port : ${process.env.PORT || 4000}`);
});
