import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Fade,
  ListItemButton,
} from "@mui/material";
import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import { menuItems } from "../../helpers";
import { ExitToApp, KeyboardArrowLeftSharp } from "@mui/icons-material";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice";
import { toggleSidebar } from "../../features/sidebar/sideSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";

const Sidebar = () => {
  const [logout] = useLogoutMutation();
  const { isOpen } = useSelector((state) => state.side);
  const user = useSelector(selectCurrentUser);
  const classes = useStyles({ isOpen });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const onLogout = async () => {
    navigate("/");
    dispatch(logOut());
    await logout();
  };

  return (
    <Box
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
    >
      <Toolbar className={classes.toolBar} />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemButton
              onClick={() => {
                user ? navigate(item.path) : dispatch(toggleModal());
              }}
              selected={location.pathname === item.path}
            >
              <Tooltip
                arrow
                placement="bottom-start"
                title={item.text}
                aria-label={item.text}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemIcon
                  className={clsx(classes.item, {
                    [classes.active]: location.pathname === item.path,
                  })}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                classes={{ primary: classes.text }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List className={classes.actions}>
        {user && (
          <ListItem button className={classes.item}>
            <ListItemButton onClick={onLogout}>
              <Tooltip
                arrow
                placement="bottom-start"
                title="Logout"
                aria-label="Logout"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemIcon className={classes.item}>
                  <ExitToApp />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                classes={{ primary: classes.text }}
                primary="Logout"
              />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem button className={classes.item}>
          <ListItemButton onClick={() => dispatch(toggleSidebar())}>
            <Tooltip
              arrow
              placement="bottom-start"
              title={isOpen ? "Close sidebar" : "Open sidebar"}
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <ListItemIcon className={classes.item}>
                <KeyboardArrowLeftSharp />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              classes={{ primary: classes.text }}
              primary={isOpen ? "Close sidebar" : "Open sidebar"}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
