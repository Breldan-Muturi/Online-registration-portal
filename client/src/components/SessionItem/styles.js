import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: "350px",
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: "1.25rem",
    fontWeight: theme.typography.fontWeightMedium,
  },
  actions: {
    width: "100%",
    padding: theme.spacing(2),
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
  },
}));
