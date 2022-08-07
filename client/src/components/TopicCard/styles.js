import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
  },
  header: {
    paddingBottom: theme.spacing(1),
  },
  content: {
    paddingBottom: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
