import React, { useState, useCallback } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  FormControlLabel,
  Switch,
  InputAdornment,
  Paper,
  Stack,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      isSignUp ? handleSignUp() : handleLogin();
    },
    [isSignUp]
  );

  const handleLogin = () => {
    // Add login logic here
  };

  const handleSignUp = () => {
    // Add sign-up logic here
  };

  const handleForgetPassword = () => {
    // Add forget password logic here
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
                    >
                      {isSignUp ? "Sign Up" : "Login"}
                    </Button>
                  </motion.div>
                  <Link
                    href="#"
                    onClick={handleForgetPassword}
                    sx={{ display: "block", textAlign: "center" }}
                  >
                    Forget Password?
                  </Link>
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
