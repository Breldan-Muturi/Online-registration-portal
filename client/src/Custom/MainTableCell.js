import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const MainTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    borderTop: "solid 1px rgb(224, 224, 224)",
    borderBottom: "unset",
  },
}));

export default MainTableCell;
