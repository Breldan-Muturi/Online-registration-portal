import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  submit: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      color: "#333",
      backgroundColor: theme.palette.primary.light,
    },
  },
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
    padding: theme.spacing(1),
    marginBottom: 20,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
  },
  div: {
    padding: theme.spacing(1),
  },
}));
