import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.grey[50],
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  toolBar: {
    height: "90px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "scroll",
    paddingBottom: "40px",
  },
  //   Sidebar
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
      color: theme.palette.grey[300],
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
  //footer
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    width: "100vw",
    backgroundColor: theme.palette.grey.A400,
    color: theme.palette.common.white,
  },
  toolbar: {
    maxHeight: "30px",
    minHeight: "30px",
    padding: "5px 20px",
  },
  //   Navbar
  app: {
    backgroundColor: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
  img: {
    width: "130px",
    height: "80px",
    margin: "10px",
  },
  title: {
    color: "#4EA375",
    fontSize: "24px",
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  div: {
    marginLeft: "auto",
  },
  tabs: {
    marginRight: 20,
    gap: "20px",
    color: "#333",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tab: {
    minWidth: "100px",
    textTransform: "capitalize",
    fontWeight: theme.typography.fontWeightBold,
  },
  icon: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
