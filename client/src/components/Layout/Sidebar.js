import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Fade,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import useStyles from "./styles";
import {
  Dashboard,
  Description,
  ExitToApp,
  Business,
  CreateNewFolder,
  Payment,
  KeyboardArrowLeftSharp,
  AccountBoxSharp,
  VerifiedUserSharp,
  FileCopy,
  PostAdd,
} from "@material-ui/icons";
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

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/",
    },
    {
      text: "Custom Application",
      icon: <Description />,
      path: "/custom-application",
    },
    {
      text: "Applications",
      icon: <FileCopy />,
      path: "/applications",
    },
    {
      text: "Payments",
      icon: <Payment />,
      path: "/payments",
    },
    {
      text: "Organization",
      icon: <Business />,
      path: "/organizations",
    },
    {
      text: "New organization",
      icon: <CreateNewFolder />,
      path: "/new-organization",
    },
    {
      text: "Completed Courses",
      icon: <VerifiedUserSharp />,
      path: "/completed-courses",
    },
    {
      text: "New Course",
      icon: <PostAdd />,
      path: "/course",
    },
    {
      text: "My profile",
      icon: <AccountBoxSharp />,
      path: "/my-profile",
    },
  ];
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
          <ListItem
            button
            key={item.text}
            onClick={() => {
              user ? navigate(item.path) : dispatch(toggleModal());
            }}
            className={clsx(classes.item, {
              [classes.active]: location.pathname === item.path,
            })}
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
          </ListItem>
        ))}
      </List>
      <List className={classes.actions}>
        {user && (
          <ListItem button className={classes.item} onClick={onLogout}>
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
          </ListItem>
        )}
        <ListItem
          button
          className={classes.item}
          onClick={() => dispatch(toggleSidebar())}
        >
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
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
