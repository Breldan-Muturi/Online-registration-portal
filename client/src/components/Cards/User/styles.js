import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  selectedCard: {
    margin: theme.spacing(2),
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
  },
  cardContent: {
    alignItems: "center",
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  actions: {
    justifyContent: "space-between",
  },
  prerequisites: {
    "&:disabled": { color: theme.palette.primary.main },
  },
}));
