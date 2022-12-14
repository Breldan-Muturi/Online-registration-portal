import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import { grey } from "@mui/material/colors";

const InnerTableCell = styled(TableCell)(({ theme }) => ({
  padding: 0,
  border: "unset",
  backgroundColor: grey[50],
}));

export default InnerTableCell;
