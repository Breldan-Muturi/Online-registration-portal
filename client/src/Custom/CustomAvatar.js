import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";

const CustomAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "size",
})(({ theme, size }) => ({
  backgroundColor: theme.palette.primary.light,
  width: theme.spacing(6),
  height: theme.spacing(6),
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.light,
  ...(size === "small" && {
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderWidth: "1px",
  }),
}));

export default CustomAvatar;
