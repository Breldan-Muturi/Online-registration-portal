import { makeStyles } from "@mui/styles";
import { green, red } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  userList: {
    maxWidth: "48%",
  },
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

export { useStyles, MenuProps };
