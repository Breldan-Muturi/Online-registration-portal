import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  app: {
    background: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
  img: {
    width: "100px",
    height: "60px",
    margin: "10px",
  },
  title: {
    color: "#4EA375",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  div: {
    marginLeft: "auto",
  },
  tabs: {
    marginRight: 20,
    gap: "20px",
    color: "#333",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export { useStyles };
