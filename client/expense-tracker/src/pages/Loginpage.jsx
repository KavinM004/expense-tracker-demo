import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add sign up logic here
  };

  const handleForgetPassword = () => {
    // Add forget password logic here
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {isSignUp ? "Sign Up" : "Login"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <Grid container spacing={2}>
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  {isSignUp ? "Sign Up" : "Login"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link href="#" onClick={handleForgetPassword}>
                  Forget Password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isSignUp}
                        onChange={(e) => setIsSignUp(e.target.checked)}
                      />
                    }
                    label={isSignUp ? "Login" : "Sign Up"}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
