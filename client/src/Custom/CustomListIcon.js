import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";

const CustomListIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(4),
}));

export default CustomListIcon;
