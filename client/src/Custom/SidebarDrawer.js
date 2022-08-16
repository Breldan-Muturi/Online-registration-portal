import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const drawerWidth = "240px";

const SidebarDrawer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between",
  flexShrink: 0,
  whiteSpace: "nowrap",
  backgroundColor: theme.palette.primary.main,
  position: "relative",
  padding: "76px 0 24px 0",
  top: 0,
  bottom: 0,
  overflowX: "hidden",
  width: theme.spacing(8),
  [theme.breakpoints.down("sm")]: {
    width: theme.spacing(7) + 1,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open && {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default SidebarDrawer;
