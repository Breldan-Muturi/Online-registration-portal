import { makeStyles } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  dragAndDrop: {},
  droppable: {
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
}));
