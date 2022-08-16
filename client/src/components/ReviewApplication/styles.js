import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  appBar: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  grid: {
    padding: theme.spacing(2),
  },
  info: {
    padding: theme.spacing(1),
  },
}));
