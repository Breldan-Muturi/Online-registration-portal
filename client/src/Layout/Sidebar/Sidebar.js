import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import ListItemButton from "@mui/material/ListItemButton";
import ExitToApp from "@mui/icons-material/ExitToApp";
import grey from "@mui/material/colors/grey";
import SidebarDrawer from "../../Custom/SidebarDrawer";
import SidebarIcon from "../../Custom/SidebarIcon";
import useStyles from "./styles";
import { selectCurrentUser } from "../../Features/global/authSlice";
import { toggleSidebar } from "../../Features/global/sideSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../Features/global/authSlice";
import { useLogoutMutation } from "../../Features/api/authApiSlice";
import useSidebarNav from "../../Hooks/useSidebarNav";
import { ROLES } from "../../Config/roles";
import useIsAdmin from "../../Hooks/useIsAdmin";

const Sidebar = () => {
  const [logout] = useLogoutMutation();
  const { isOpen } = useSelector((state) => state.side);
  const { user, isAdmin } = useIsAdmin();
  const menuItems = useSidebarNav(isAdmin);
  const classes = useStyles({ isOpen });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <SidebarDrawer open={isOpen}>
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
                <SidebarIcon open={isOpen} />
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
