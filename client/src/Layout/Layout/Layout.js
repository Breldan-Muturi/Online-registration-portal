import React from "react";
import { Outlet } from "react-router-dom";
import { Box, ThemeProvider, Toolbar } from "@mui/material";
import { Footer, Navbar, Sidebar } from "..";
import { theme } from "../../App/theme";
import { useStyles } from "./styles";

const Layout = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main className={classes.root}>
        <Sidebar />
        <Box className={classes.content}>
          <Toolbar className={classes.toolBar} />
          <Outlet />
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
