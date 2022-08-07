import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
  },
  subheader: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.primary.main,
  },
  root: {
    margin: "0 auto",
    width: "60%",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    marginTop: theme.spacing(1),
    marginBottom: "auto",
    marginRight: theme.spacing(1),
  },
  circle: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: theme.palette.primary.light,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.primary.light,
  },
  iconred: {
    color: theme.palette.error.light,
  },
}));
