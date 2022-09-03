import { makeStyles } from "@mui/styles";
import { green, red } from "@mui/material/colors";

export default makeStyles((theme) => ({
  selected: {
    maxWidth: "50%",
    padding: theme.spacing(2),
    borderRadius: "4px",
  },
  selectedUsers: {
    backgroundColor: green[50],
  },
  noSelectedUsers: {
    backgroundColor: red[50],
  },
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
