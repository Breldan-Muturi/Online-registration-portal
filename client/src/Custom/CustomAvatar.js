import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: theme.spacing(6),
  height: theme.spacing(6),
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.light,
}));

export default CustomAvatar;
