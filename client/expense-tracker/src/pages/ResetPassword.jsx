import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import { Lock, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

const ResetPasswordPage = () => {
  const { token } = useParams(); // ✅ Get token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, { newPassword });
      setMessage(response.data.message || "Password reset successful!");
      setTimeout(() => navigate("/"), 4000);
    } catch (error) {
      setError(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
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
        background: "#f5f5f5",
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
                Reset Password
              </Typography>
              <form onSubmit={handleResetPassword} style={{ width: "100%" }}>
                <Stack spacing={2}>
                  <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                      disabled={loading || !newPassword}
                      startIcon={<CheckCircle />}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </motion.div>
                  {message && (
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", color: "green" }}
                    >
                      {message}
                    </Typography>
                  )}
                  {error && (
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", color: "red" }}
                    >
                      {error}
                    </Typography>
                  )}
                </Stack>
              </form>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default ResetPasswordPage;
