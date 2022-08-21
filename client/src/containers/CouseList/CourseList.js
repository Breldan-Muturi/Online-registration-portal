import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Typography, Grid, Box } from "@mui/material";
import { CourseItem } from "../../components";
import useStyles from "./styles";
import Pagination from "@mui/material/Pagination";
import {
  useGetCoursesQuery,
  selectCourseIds,
} from "../../features/course/courseApiSlice";

const CourseList = (user) => {
  const classes = useStyles();
  const { isLoading, isSuccess, isError, error } = useGetCoursesQuery();
  const courseIds = useSelector(selectCourseIds);
  const [coursePage, setCoursePage] = useState(1);

  return (
    <Box p={4} className={classes.box}>
      <Typography variant="h2" color="error">
        Our Training Programmes
      </Typography>
      {courseIds?.length > 0 && isSuccess && (
        <>
          <Grid container direction="row" alignItems="stretch" spacing={3}>
            {courseIds
              .slice((coursePage - 1) * 6, (coursePage - 1) * 6 + 6)
              .map((courseId) => (
                <CourseItem key={courseId} courseId={courseId} user={user} />
              ))}
          </Grid>
          <Pagination
            count={Math.ceil(courseIds?.length / 6)}
            onChange={(_, value) => setCoursePage(value)}
          />
        </>
      )}
      {isLoading && (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignContent="flex-start"
          alignItems="center"
        >
          <CircularProgress />
          <Typography>Loading Portal Courses</Typography>
        </Grid>
      )}
      {isError && (
        <Typography>
          Something went wrong while getting courses:
          <br /> {error}
        </Typography>
      )}
    </Box>
  );
};

export default CourseList;
