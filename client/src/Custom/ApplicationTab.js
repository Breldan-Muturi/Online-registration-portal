import { styled } from "@mui/material/styles";
import { Tab } from "@mui/material";

const ApplicationTab = styled(Tab)(({ theme }) => ({
  minHeight: theme.spacing(3),
  textTransform: "capitalize",
  fontSize: "1rem",
  fontWeight: theme.typography.fontWeightRegular,
}));

export default ApplicationTab;
