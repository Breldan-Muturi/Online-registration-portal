import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  circle: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.light,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.light,
  },
}));
