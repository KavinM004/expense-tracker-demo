import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #3a3d41, #222327)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card
          sx={{
            width: "400px",
            padding: 2,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 5,
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {isLogin ? "Login" : "Register"}
            </Typography>

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button color="primary" onClick={handleToggle}>
                {isLogin ? "Register" : "Login"}
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
