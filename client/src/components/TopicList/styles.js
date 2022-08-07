import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
  },
  root: {
    margin: "0 auto",
    width: "60%",
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.primary.main,
  },
}));
