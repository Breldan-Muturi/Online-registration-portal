import React from "react";
import { Tabs, Toolbar, Typography, AppBar } from "@mui/material";
import Logo from "../../assets/kippra+thinking+policy+together+white+bg.png";
import { Link } from "react-router-dom";
import { AuthModal } from "../../containers";
import { StyledTab, NavIcon } from "../../Custom";
import { useStyles } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const classes = useStyles();
  const navItems = [
    {
      label: "About us",
      path: "https://kippra.or.ke",
    },
    {
      label: "Contact us",
      path: "https://kippra.or.ke/contact-us/",
    },
    {
      label: "Portal User Guide",
      path: "https://kippraelearning.or.ke",
    },
    {
      label: "eLearning",
      path: "https://kippraelearning.or.ke",
    },
  ];
  return (
    <>
      <AppBar component="nav" position="fixed">
        <Toolbar className={classes.app}>
          <Link to="/">
            <img
              src={Logo}
              alt="KIPPRA Capacity Building Portal Logo"
              aria-label="KIPPRA Capacity Building Portal Logo"
              className={classes.img}
            />
          </Link>
          <Typography variant="h6" component="h1" className={classes.title}>
            KIPPRA Capacity Building Portal
          </Typography>
          <div className={classes.div}>
            <Tabs value={false} className={classes.tabs}>
              {navItems.map((item) => (
                <StyledTab
                  key={item.label}
                  to={item.path}
                  label={item.label}
                  classes={{ root: classes.tab }}
                  className={classes.tab}
                />
              ))}
            </Tabs>
            <NavIcon>
              <MenuIcon />
            </NavIcon>
          </div>
          <AuthModal />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
