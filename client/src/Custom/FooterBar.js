import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";
import { grey } from "@mui/material/colors";

const FooterBar = styled(Toolbar)(({ theme }) => ({
  minHeight: theme.spacing(4),
  "& .MuiToolbar-root": {
    padding: 0,
  },
  backgroundColor: grey.A700,
}));

export default FooterBar;
