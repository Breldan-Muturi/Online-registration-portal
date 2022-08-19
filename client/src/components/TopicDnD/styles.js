import { makeStyles } from "@mui/styles";
import { green, grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  dragArea: {
    padding: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(2),
    maxWidth: "48%",
    borderRadius: "4px",
  },
  availableContainer: {
    backgroundColor: grey[100],
  },
  availableContainerDragged: {
    backgroundColor: grey[200],
  },
  selectedContainer: {
    backgroundColor: green[50],
  },
  selectedContainerDragged: {
    backgroundColor: green[100],
  },
  message: {
    padding: theme.spacing(3),
  },
}));
