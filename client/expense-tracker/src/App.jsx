import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "@mui/material";

const App = () => {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/"
            element={auth ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
