import { styled } from "@mui/material/styles";
import { ListSubheader } from "@mui/material";
import { shouldForwardProp } from "@mui/styled-engine";

const Subheader = styled(ListSubheader, {
  shouldForwardProp: (prop) => prop !== "size",
})(({ theme, size }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.primary.main,
  ...(size === "small" && {
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.h3.fontSize,
  }),
}));

export default Subheader;
