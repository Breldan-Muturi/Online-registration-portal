import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuProps from "../../../Helpers/MenuProps";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";

const SessionCourses = ({ courseId, setCourseId }) => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery("courses", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={2} alignItems="center">
        <CircularProgress size={20} />
        <Typography variant="body1">Loading courses ...</Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography
        variant="body1"
        color="error"
      >{`Something went wrong loading courses: ${error?.data?.message}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids, entities } = courses;

    if (!ids.length) {
      content = (
        <Typography variant="body1" color="error">
          There are no available prerequisite courses.
        </Typography>
      );
    }
    if (ids.length) {
      content = (
        <TextField
          label="Select session course"
          value={ids.includes(courseId) ? courseId : ""}
          select
          SelectProps={{
            MenuProps: MenuProps,
            renderValue: (courseId) => entities[courseId]?.title,
            defaultValue: "",
          }}
          fullWidth
          onChange={(e) => setCourseId(e.target.value)}
          helperText="Select a course for this session"
        >
          {ids.map((menuCourseId, index) => (
            <ListItemButton
              key={index}
              value={menuCourseId}
              dense
              divider
              selected={menuCourseId === courseId}
            >
              <Checkbox
                color="primary"
                size="small"
                edge="start"
                checked={menuCourseId === courseId}
              />
              <ListItemText primary={entities[menuCourseId]?.title} />
            </ListItemButton>
          ))}
        </TextField>
      );
    }
  }

  return <Grid xs={12}>{content}</Grid>;
};

export default SessionCourses;
