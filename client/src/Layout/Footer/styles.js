import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    height: "auto",
    width: "100vw",
    color: theme.palette.common.white,
  },
  toolbar: {
    backgroundColor: grey.A700,
  },
}));
