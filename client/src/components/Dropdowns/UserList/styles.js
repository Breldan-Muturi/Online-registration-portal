import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  indeterminateColor: {
    color: theme.palette.primary.light,
  },
  circle: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.light,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.light,
  },
  notify: {
    padding: theme.spacing(2),
  },
  textNotify: {
    paddingLeft: theme.spacing(2),
  },
}));
