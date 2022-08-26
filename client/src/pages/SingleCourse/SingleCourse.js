import React, { useState } from "react";
import { Typography, Tabs, Box, Grid, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SessionList, TopicList } from "../../containers";
import {
  selectCourseById,
  useGetCoursesQuery,
} from "../../features/course/courseApiSlice";
import CourseSettings from "../CourseSettings/CourseSettings";
import { useStyles } from "./styles";
import { CourseToolbar, StyledTab } from "../../Custom/index";
import { Applications } from "../";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-settings-tabpanel-${index}`}
      aria-labelledby={`course-settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box component="section">{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SingleCourse = () => {
  const classes = useStyles();
  const { isLoading, isSuccess, isError, error } = useGetCoursesQuery();
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box component="section" className={classes.section}>
      {isLoading && (
        <Grid container spacing={3} direction="row">
          <CircularProgress />
          <Typography>Loading course content</Typography>
        </Grid>
      )}
      {isError && (
        <Typography>
          Something went wrong: <br />
          {error}
        </Typography>
      )}
      {isSuccess && (
        <>
          <div className={classes.header}>
            <Typography variant="h4" component="h2" className={classes.title}>
              {course.title}
            </Typography>
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
              <StyledTab label="Summary" {...a11yProps(0)} />
              <StyledTab label="Settings" {...a11yProps(1)} />
              <StyledTab label="Topics" {...a11yProps(2)} />
              <StyledTab label="Sessions" {...a11yProps(3)} />
              <StyledTab label="Applications" {...a11yProps(4)} />
            </Tabs>
          </CourseToolbar>
          <TabPanel className={classes.panel} value={value} index={0}>
            <Typography>{course.description}</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CourseSettings course={course} />
          </TabPanel>
          <TabPanel className={classes.panel} value={value} index={2}>
            <TopicList courseId={courseId} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <SessionList />
          </TabPanel>
          <TabPanel className={classes.panel} value={value} index={4}>
            <Applications />
          </TabPanel>
        </>
      )}
    </Box>
  );
};

export default SingleCourse;
