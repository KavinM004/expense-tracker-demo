import React, { useContext, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Memoized Logout Handler to prevent unnecessary re-renders
  const handleLogout = useCallback(() => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
  }, [setAuth, navigate]);

  // Memoized Authentication Buttons for better performance
  const AuthButtons = useMemo(
    () =>
      auth ? (
        <>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </>
      ),
    [auth, handleLogout]
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        {AuthButtons}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
