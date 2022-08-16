import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";

const ApplyButton = styled(ButtonBase)(({ theme }) => ({
  width: "100%",
  marginTop: "auto",
  alignItems: "stretch",
  transition: theme.transitions.duration.standard,
  "& > *": {
    transition: theme.transitions.duration.standard,
    color: theme.palette.common.white,
    textTransform: "uppercase",
  },
  "& :hover": {
    backgroundColor: theme.palette.primary.light,
    "& > *": {
      color: "#333",
    },
  },
}));

export default ApplyButton;
