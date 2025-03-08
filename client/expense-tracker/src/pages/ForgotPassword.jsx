import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import { Email, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleForgotPassword = async (e) => {
   e.preventDefault();
   setLoading(true);
   setMessage("");
   setError("");

   try {
     const response = await axios.post(
       "https://expense-tracker-demo-sanu.onrender.com/api/auth/forgot-password",
       { email }
     );

     setMessage(response.data.message); // Success message from backend
     setTimeout(() => navigate("/"), 4000); // Redirect after 4 sec
   } catch (err) {
     setError(
       err.response?.data?.message || "Failed to send email. Try again."
     );
   } finally {
     setLoading(false);
   }
 };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mt: 5 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Forgot Password?
          </Typography>
          <Typography variant="body2" textAlign="center">
            Enter your email to receive a password reset link.
          </Typography>
          <form onSubmit={handleForgotPassword} style={{ width: "100%" }}>
            <Stack spacing={2}>
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "black" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: "black", color: "#fff", py: 1.5 }}
                startIcon={<Send />}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Stack>
          </form>
          {message && <Typography color="success.main">{message}</Typography>}
          {error && <Typography color="error.main">{error}</Typography>}
        </Stack>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
