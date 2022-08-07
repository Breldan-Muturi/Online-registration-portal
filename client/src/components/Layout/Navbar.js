import {
  Tab,
  Tabs,
  Toolbar,
  Typography,
  AppBar,
  IconButton,
} from "@material-ui/core";
import Logo from "../../assets/kippra+thinking+policy+together+white+bg.png";
import { Link } from "react-router-dom";
import { AuthModal } from "../index";
import useStyles from "./styles";
import MenuIcon from "@material-ui/icons/Menu";

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
    <nav>
      <AppBar position="fixed" className={classes.app}>
        <Toolbar>
          <Link to="/">
            <img
              src={Logo}
              alt="KIPPRA Capacity Building Portal Logo"
              aria-label="KIPPRA Capacity Building Portal Logo"
              className={classes.img}
            />
          </Link>
          <Typography variant="h1" component="h1" className={classes.title}>
            KIPPRA Capacity Building Portal
          </Typography>
          <div className={classes.div}>
            <Tabs value={false} className={classes.tabs}>
              {navItems.map((item) => (
                <Tab
                  key={item.label}
                  to={item.path}
                  label={item.label}
                  className={classes.tab}
                />
              ))}
            </Tabs>
            <IconButton className={classes.icon}>
              <MenuIcon />
            </IconButton>
          </div>
          <AuthModal />
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
