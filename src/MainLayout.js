import React, { useState } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  Collapse,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logo from "./assets/images/logo/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import useAuth from "./Utils/hooks/useAuth";
import { useLocation } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // green
    },
    secondary: {
      main: "#ffeb3b", // yellow
    },
  },
});

export default function MainLayout({component}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openSetting, setOpenSetting] = useState(false);

  const handleSettingClick = () => {
    setOpenSetting(!openSetting);
  };

  const onClickLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        <Box sx={{ display: "flex", width: "100%" }}>
          <AppBar
            position="fixed"
            sx={{
              width: drawerOpen ? "calc(100% - 180px)" : "100%",
              marginLeft: drawerOpen ? "300px" : "0",
              transition: "all 0.3s",
            }}
          >
            <Toolbar className="header-maain">
              <div className="d-flex justify-content-between align-items-center w-100 ">
                <IconButton
                  className="menu-icon"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <MenuIcon />
                </IconButton>
                <div className="d-flex">
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className="left-panel"
            variant="persistent"
            open={drawerOpen}
            sx={{ width: drawerOpen ? "180px" : "auto", flexShrink: 0 }}
          >
            <div className="sidebar">
              <div className="d-flex inner-logo justify-content-center">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <img src={Logo} alt="Logo" className="logo" />
                </IconButton>
              </div>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={`${location.pathname === '/user' ? 'active' : ''} list-item-inner`}
                  onClick={() => navigate("/user")}
                >
                  <ListItemText primary="User" />
                </ListItem>               
              </List>
              <ListItem
                button
                className="list-item-inner"
                onClick={() => onClickLogout()}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </Drawer>
          {/* Container to hold the page content */}
          <Container
            sx={{
              pt: "64px",
              pl: drawerOpen ? "0" : "0px",
              pr: "0",
              transition: "padding 0.3s",
              width: "100%",
            }}
          >
            <Paper style={{ minWidth: '100%' }} elevation={4} className="paper-layout">{component}</Paper>
          </Container>
        </Box>
      }
    </ThemeProvider>
  );
}
