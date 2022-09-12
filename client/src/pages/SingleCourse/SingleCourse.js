import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useStyles from "./styles";
import CustomToolbar from "../../Custom/CustomToolbar";
import StyledTab from "../../Custom/StyledTab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../Features/api/courseApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import CourseSummary from "../../Components/Summary/CourseSummary";
import EditCourse from "../CourseSettings/EditCourse";
import TopicList from "../../Lists/Topics/TopicList";
import SessionList from "../../CardList/Sessions/SessionList";
import Applications from "../Applications";
import { useDispatch, useSelector } from "react-redux";
import { setCourseTab } from "../../Features/global/navSlice";
import Application from "../../Forms/Application";

const SingleCourse = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courseTab, sessionId } = useSelector((state) => state.nav);
  const { isAdmin } = useIsAdmin();
  const { title } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      title: data?.entities[courseId].title,
    }),
  });

  const handleChange = (event, newValue) => {
    dispatch(setCourseTab(newValue));
  };

  return (
    <Box component="section" className={classes.section}>
      <div className={classes.header}>
        <Typography variant="h4" component="h2" className={classes.title}>
          {title}
        </Typography>
      </div>
      <TabContext value={courseTab}>
        <CustomToolbar variant="dense" className={classes.toolbar}>
          <TabList
            indicatorColor="primary"
            onChange={handleChange}
            className={classes.tabs}
            classes={{
              button: classes.button,
            }}
            aria-label="Course page tabs"
          >
            <StyledTab label="Summary" value="Summary" />
            {isAdmin && <StyledTab label="Settings" value="Settings" />}
            <StyledTab label="Topics" value="Topics" />
            <StyledTab label="Sessions" value="Sessions" />
            <StyledTab label="Applications" value="Applications" />
          </TabList>
        </CustomToolbar>
        <TabPanel value="Summary">
          <CourseSummary />
        </TabPanel>
        <TabPanel value="Settings">
          <EditCourse />
        </TabPanel>
        <TabPanel value="Topics">
          <TopicList />
        </TabPanel>
        <TabPanel value="Sessions">
          {sessionId ? <Application /> : <SessionList />}
        </TabPanel>
        <TabPanel value="Applications">
          <Applications />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SingleCourse;
