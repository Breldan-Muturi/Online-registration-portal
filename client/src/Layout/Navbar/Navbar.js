import React from "react";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import navItems from "../../Helpers/HeaderNav";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../Assets/kippra+thinking+policy+together+white+bg.png";
import AuthModal from "../../Modals/Auth/AuthModal";
import StyledTab from "../../Custom/StyledTab";
import NavIcon from "../../Custom/NavIcon";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Navbar = () => {
  const classes = useStyles();

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
                  component="a"
                  key={item.label}
                  href={item.path}
                  target="_blank"
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
