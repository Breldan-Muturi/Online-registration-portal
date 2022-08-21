import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";

const UploadPreview = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "size",
})(({ theme, size }) => ({
  backgroundColor: "#fff",
  width: theme.spacing(8),
  height: theme.spacing(8),
  margin: theme.spacing(2),
  borderWidth: "2px",
  borderRadius: "2px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.light,
  ...(size === "small" && {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(1),
    borderWidth: "1px",
    borderRadius: "1px",
  }),
}));

export default UploadPreview;
