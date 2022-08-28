import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { CenterList } from "../Custom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { CompletedCourseModal } from "../modals";
const CompletedCourses = () => {
  const user = useSelector(selectCurrentUser);
  // const {data: completedCourses, isSuccess, isLoading, isError, error } = useGet
  return (
    <Box>
      <CenterList
        spacing={3}
        aria-labelledby="Completed Courses"
        subheader={
          <Stack
            direction="row"
            p={3}
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography color="primary" variant="h3">
              My Completed Courses
            </Typography>
            <CompletedCourseModal />
          </Stack>
        }
      ></CenterList>
    </Box>
  );
};

export default CompletedCourses;
