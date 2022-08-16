import {
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
import { useStyles } from "./styles";
import { menuItems } from "../../helpers";
import { ExitToApp, KeyboardArrowLeftSharp } from "@mui/icons-material";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice";
import { toggleSidebar } from "../../features/sidebar/sideSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { grey } from "@mui/material/colors";
import { SidebarDrawer } from "../../Custom";

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
    <SidebarDrawer open={isOpen}>
      {/* <Toolbar className={classes.toolBar} /> */}
      <List>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
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
                <ListItemIcon sx={{ color: grey[50] }}>
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={item.text}
                classes={{ primary: classes.listColor }}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  variant: "body2",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {user && (
          <ListItem disablePadding>
            <ListItemButton onClick={onLogout}>
              <Tooltip
                arrow
                placement="bottom-start"
                title="Logout"
                aria-label="Logout"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemIcon sx={{ color: grey[50] }}>
                  <ExitToApp />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Logout"
                classes={{ primary: classes.listColor }}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  variant: "body2",
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(toggleSidebar())}>
            <Tooltip
              arrow
              placement="bottom-start"
              title={isOpen ? "Close sidebar" : "Open sidebar"}
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <ListItemIcon sx={{ color: grey[50] }}>
                <KeyboardArrowLeftSharp />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary={isOpen ? "Close sidebar" : "Open sidebar"}
              classes={{ primary: classes.listColor }}
              primaryTypographyProps={{
                fontWeight: "bold",
                variant: "body2",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </SidebarDrawer>
  );
};

export default Sidebar;
