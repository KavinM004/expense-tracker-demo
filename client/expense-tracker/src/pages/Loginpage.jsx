import React, { useState, useCallback } from "react";
import { login, register } from "../api/api.jsx";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
  InputAdornment,
  Paper,
  Stack,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await handleLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful! Redirecting...", { autoClose: 2000 });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await register({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success(response.data.message || "Sign up successful!");
      setIsSignUp(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
      }}
    >
      <Container maxWidth="xs">
        <ToastContainer position="top-right" autoClose={3000} />{" "}
        {/* Toaster added */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: "#fff" }}>
            <Stack spacing={2} alignItems="center">
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "black", fontWeight: "bold" }}
              >
                {isSignUp ? "Sign Up" : "Login"}
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Stack spacing={2}>
                  {isSignUp && (
                    <TextField
                      label="Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: "#4B0082" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#4B0082" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#4B0082" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ bgcolor: "#4B0082", color: "#fff", py: 1.5 }}
                      disabled={loading}
                    >
                      {loading
                        ? "Processing..."
                        : isSignUp
                        ? "Sign Up"
                        : "Login"}
                    </Button>
                  </motion.div>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ cursor: "pointer", color: "blue" }}
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">
                      {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isSignUp}
                          onChange={() => setIsSignUp((prev) => !prev)}
                        />
                      }
                      label={isSignUp ? "Login" : "Sign Up"}
                    />
                  </Box>
                </Stack>
              </form>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
