import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const ExpandIconCustom = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expanded",
})(({ theme, expanded }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  ...(expanded && {
    transform: "rotate(180deg)",
  }),
}));

export default ExpandIconCustom;
