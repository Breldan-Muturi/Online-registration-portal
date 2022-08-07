import { Typography, Toolbar, Tabs, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SessionList, TopicList } from "../../components";
import { selectCourseById } from "../../features/course/courseApiSlice";
import CourseSettings from "../CourseSettings/CourseSettings";
import { useStyles, StyledTab } from "./styles";

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
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box component="section" className={classes.section}>
      <div className={classes.header}>
        <Typography variant="h4" component="h2" className={classes.title}>
          {course.title}
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
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
      </Toolbar>
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
        <Typography>Applications coming soon</Typography>
      </TabPanel>
    </Box>
  );
};

export default SingleCourse;
