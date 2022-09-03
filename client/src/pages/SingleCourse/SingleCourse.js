import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "./styles";
import CourseToolbar from "../../Custom/CourseToolbar";
import StyledTab from "../../Custom/StyledTab";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {
  selectCourseById,
  useGetCoursesQuery,
} from "../../Features/api/courseApiSlice";

function a11yProps(index) {
  return {
    component: "a",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SingleCourse = () => {
  const classes = useStyles();
  const { isSuccess, isError, error } = useGetCoursesQuery();
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let content = (
    <Stack container spacing={3} direction="row">
      <CircularProgress />
      <Typography>Loading course content</Typography>
    </Stack>
  );

  if (isSuccess) {
    content = <Outlet />;
  } else if (isError) {
    content = (
      <Typography>
        Something went wrong: <br />
        {error}
      </Typography>
    );
  }

  return (
    <Box component="section" className={classes.section}>
      <div className={classes.header}>
        {isSuccess && (
          <Typography variant="h4" component="h2" className={classes.title}>
            {course.title}
          </Typography>
        )}
      </div>
      <CourseToolbar variant="dense" className={classes.toolbar}>
        <Tabs
          value={value}
          indicatorColor="primary"
          className={classes.tabs}
          classes={{
            button: classes.button,
          }}
          onChange={handleChange}
          aria-label="Course page tabs"
        >
          <StyledTab
            label="Summary"
            href={`/course/${courseId}`}
            {...a11yProps(0)}
          />
          <StyledTab
            label="Settings"
            href={`/course/${courseId}/settings`}
            {...a11yProps(1)}
          />
          <StyledTab
            label="Topics"
            href={`/course/${courseId}/topics`}
            {...a11yProps(2)}
          />
          <StyledTab
            label="Sessions"
            href={`/course/${courseId}/sessions`}
            {...a11yProps(3)}
          />
          <StyledTab
            label="Applications"
            href={`/course/${courseId}/applications`}
            {...a11yProps(4)}
          />
        </Tabs>
      </CourseToolbar>
      <Box p={3} component="section">
        {content}
      </Box>
    </Box>
  );
};

export default SingleCourse;
