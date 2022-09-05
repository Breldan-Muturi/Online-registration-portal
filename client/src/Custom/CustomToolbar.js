import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "auto",
  "& .MuiToolbar-root": {
    padding: 0,
  },
  backgroundColor: theme.palette.common.white,
}));

export default CustomToolbar;
