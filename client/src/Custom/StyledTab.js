import { styled } from "@mui/material/styles";
import { Tab } from "@mui/material";

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: "100px",
  textTransform: "capitalize",
  fontSize: "1rem",
  fontWeight: theme.typography.fontWeightBold,
}));

export default StyledTab;
