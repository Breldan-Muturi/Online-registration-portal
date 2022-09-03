import React from "react";
import Box from "@mui/material/Box";
import ThemeProvider from "@mui/styles/ThemeProvider";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { theme } from "../../App/theme";
import useStyles from "./styles";

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
