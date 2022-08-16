import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const NavIcon = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export default NavIcon;
