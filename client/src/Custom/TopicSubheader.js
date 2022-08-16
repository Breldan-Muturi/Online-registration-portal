import { styled } from "@mui/material/styles";
import { ListSubheader } from "@mui/material";

const TopicSubheader = styled(ListSubheader)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.primary.main,
}));

export default TopicSubheader;
