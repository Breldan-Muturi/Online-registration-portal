import { styled } from "@mui/material/styles";
import KeyboardArrowLeftSharp from "@mui/icons-material/KeyboardArrowLeftSharp";

const SidebarIcon = styled(KeyboardArrowLeftSharp, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transform: "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  ...(open && {
    transform: "rotate(0deg)",
  }),
}));

export default SidebarIcon;
