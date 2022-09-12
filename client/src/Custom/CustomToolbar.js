import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";

const CustomToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== "border",
})(({ theme, border }) => ({
  minHeight: "auto",
  "& .MuiToolbar-root": {
    padding: 0,
  },
  backgroundColor: theme.palette.common.white,
  ...(border && {
    minHeight: theme.spacing(3),
    borderRadius: "8px 8px 0 0",
    borderBottom: "solid 1px rgb(224, 224, 224)",
  }),
}));

export default CustomToolbar;
