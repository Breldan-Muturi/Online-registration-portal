import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  auth: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5px",
    },
    "&:hover": {
      color: "#333",
      backgroundColor: theme.palette.primary.light,
    },
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
    gap: "10px",
    alignItems: "center",
  },
  circle: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.light,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "30%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  div: {
    padding: 10,
  },
  appBar: {
    marginBottom: 20,
    backgroundColor: grey[50],
    color: "#fff",
  },
  tabs: {
    color: "#333",
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
  tab: {
    flexGrow: 1,
  },
  submit: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    width: "100%",
    "&:hover": {
      color: "#333",
      backgroundColor: theme.palette.primary.light,
    },
  },
  imageIcon: {
    display: "flex",
    height: "inherit",
    width: "inherit",
  },
  iconRoot: {
    textAlign: "center",
  },
}));
