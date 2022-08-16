import { styled } from "@mui/material/styles";
import { List } from "@mui/material";

const CenterList = styled(List)(({ theme }) => ({
  margin: "0 auto",
  width: "60%",
  backgroundColor: theme.palette.background.paper,
}));

export default CenterList;
