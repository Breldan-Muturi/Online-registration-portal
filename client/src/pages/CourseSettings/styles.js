import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: { padding: theme.spacing(3) },
  submit: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    width: "100%",
    "&:hover": {
      color: "#333",
      backgroundColor: theme.palette.primary.light,
    },
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
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
