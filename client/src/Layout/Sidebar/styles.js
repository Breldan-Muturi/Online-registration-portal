import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: "flex",
    flexDirection: "column",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: theme.palette.primary.main,
    position: "relative",
    paddingBottom: "30px",
    top: 0,
    bottom: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },
  item: {
    "& > *": {
      color: grey[300],
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  text: {
    fontWeight: theme.typography.fontWeightBold,
  },
  actions: {
    marginTop: "auto",
  },
  active: {
    "& > *": {
      color: "#333",
    },
    backgroundColor: theme.palette.primary.light,
  },
}));

export { useStyles };
