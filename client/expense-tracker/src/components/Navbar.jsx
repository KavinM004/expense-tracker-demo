import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Settings,
  ExitToApp,
  Person,
  MenuOpen,
  ReceiptLong,
  GetApp,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔹 Clear authentication token
    navigate("/login"); // 🔹 Redirect to login page
  };


  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #4B0082, #8A2BE2)",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
      }}
    >
      <Toolbar sx={{ width: "100%", minHeight: "64px", paddingX: 2 }}>
        <IconButton onClick={toggleDrawer} sx={{ color: "white", mr: 2 }}>
          <MenuOpen fontSize="large" />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
          Expense Tracker
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              color: "white",
              p: 0,
              mr: { xs: 2, sm: 3, md: 4 },
              ml: { xs: -1, sm: -1.5, md: -2 },
            }}
          >
            <AccountCircle fontSize="large" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Person sx={{ mr: 1 }} /> My Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            background: "linear-gradient(90deg, #4B0082, #8A2BE2)",
            height: "100vh",
          }}
        >
          <List>
            {[
              {
                text: "Expense Manager",
                icon: <ReceiptLong />,
                path: "/expenses",
              },
              { text: "Download Report", icon: <GetApp />, path: "/report" },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  onClick={() => handleNavigation(item.path)}
                  component="div"
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255, 255, 255, 0.3)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      marginY: 1,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: "white" }} />
                </ListItem>
                <Divider sx={{ backgroundColor: "white", marginY: "5px" }} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default DashboardNavbar;
