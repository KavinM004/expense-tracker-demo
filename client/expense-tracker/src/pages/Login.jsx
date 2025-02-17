import React, { useState, useContext, memo } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      setAuth(data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default memo(Login);
