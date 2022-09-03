import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: grey[50],
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
}));
