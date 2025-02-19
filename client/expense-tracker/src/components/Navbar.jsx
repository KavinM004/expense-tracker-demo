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
  Dashboard,
  ReceiptLong,
  GetApp,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const DashboardNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #4B0082, #8A2BE2)",
        width: "100%",
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          padding: "0 !important",
          minHeight: "56px",
          margin: 0,
        }}
      >
        <motion.div
          animate={{ x: menuOpen ? 250 : 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: "white", mr: 2, position: "relative", zIndex: 1301 }}
          >
            <MenuOpen fontSize="large" />
          </IconButton>
        </motion.div>

        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
          Expense Tracker
        </Typography>

        <Box>
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
              <AccountCircle fontSize="large" />
            </IconButton>
          </motion.div>
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
            <MenuItem onClick={handleMenuClose}>
              <ExitToApp sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer}>
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          style={{
            position: "relative",
            background: "linear-gradient(90deg, #4B0082, #8A2BE2)",
            height: "100vh",
          }}
        >
          <Box sx={{ width: 250, position: "relative" }}>
            <List>
              <ListItem
                button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    margin: "8px 0",
                  },
                }}
              >
                <ListItemIcon>
                  <Dashboard sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ color: "white" }} />
              </ListItem>
              <Divider sx={{ backgroundColor: "white", margin: "5px 0" }} />
              <ListItem
                button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    margin: "8px 0",
                  },
                }}
              >
                <ListItemIcon>
                  <ReceiptLong sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Expense Manager"
                  sx={{ color: "white" }}
                />
              </ListItem>
              <Divider sx={{ backgroundColor: "white", margin: "5px 0" }} />
              <ListItem
                button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    margin: "8px 0",
                  },
                }}
              >
                <ListItemIcon>
                  <GetApp sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Download Report"
                  sx={{ color: "white" }}
                />
              </ListItem>
              <Divider sx={{ backgroundColor: "white", margin: "5px 0" }} />
            </List>
          </Box>
        </motion.div>
      </Drawer>
    </AppBar>
  );
};

export default DashboardNavbar;
