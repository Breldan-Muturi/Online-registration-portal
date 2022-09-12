import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import MenuProps from "../../../Helpers/MenuProps";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import CompletedCourseMenu from "../MenuItems/CompletedCourseMenu";
import { useDispatch, useSelector } from "react-redux";
import { setCourseId } from "../../../Features/forms/completedCourseSlice";

const CompletedCourse = () => {
  const dispatch = useDispatch();
  const courseId = useSelector((state) => state.completedCourse.courseId);

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
          value={courseId}
          select
          SelectProps={{
            MenuProps: MenuProps,
            renderValue: (courseId) => entities[courseId].title,
            defaultValue: "",
          }}
          fullWidth
          onChange={(e) => dispatch(setCourseId(e.target.value))}
          helperText="Select a course you have completed"
        >
          {ids.map((courseId, index) => (
            <CompletedCourseMenu
              key={index}
              value={courseId}
              courseId={courseId}
            />
          ))}
        </TextField>
      );
    }
  }

  return <Grid xs={12}>{content}</Grid>;
};

export default CompletedCourse;
