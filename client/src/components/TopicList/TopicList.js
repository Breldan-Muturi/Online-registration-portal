import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListSubheader,
  Grid,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCourseById } from "../../features/course/courseApiSlice";
import {
  useGetTopicsQuery,
  selectTopicsByCourse,
} from "../../features/topic/topicApiSlice";
import TopicModal from "../TopicModal/TopicModal";
import useStyles from "./styles";

const TopicList = ({ courseId }) => {
  const classes = useStyles();
  const course = useSelector((state) => selectCourseById(state, courseId));
  const topics = useSelector((state) => selectTopicsByCourse(state, courseId));
  const { isLoading, isSuccess, isError, error } = useGetTopicsQuery();
  const [topicPage, setTopicPage] = useState(1);

  return (
    <Box p={3} className={classes.box}>
      {topics?.length > 0 && isSuccess && (
        <Grid container direction="column">
          <List
            spacing={3}
            aria-labelledby={course.title + "Course Topics"}
            subheader={
              <ListSubheader
                component="h3"
                className={classes.subheader}
                id="topics-list-subheader"
              >
                Topics covered under {course.title}
              </ListSubheader>
            }
            className={classes.root}
          >
            {topics
              .slice((topicPage - 1) * 6, (topicPage - 1) * 6 + 6)
              .map((mappedTopic) => (
                <React.Fragment key={mappedTopic._id}>
                  <ListItem key={mappedTopic._id}>
                    <ListItemText
                      primary={
                        <Typography>
                          {topics.indexOf(mappedTopic) + 1}. {mappedTopic.title}
                        </Typography>
                      }
                      secondary={mappedTopic.description}
                    />
                  </ListItem>
                  {topics.indexOf(mappedTopic) + 1 !== topics.length && (
                    <Divider variant="middle" component="li" />
                  )}
                </React.Fragment>
              ))}
            {Math.ceil(topics?.length / 6) > 1 && (
              <Pagination
                count={Math.ceil(topics?.length / 6)}
                onChange={(_, value) => setTopicPage(value)}
              />
            )}
          </List>
        </Grid>
      )}
      <Grid container direction="column">
        {topics?.length === 0 && isSuccess && (
          <Typography color="error">
            There are no published topics for this course
          </Typography>
        )}
        {isLoading && (
          <>
            <CircularProgress />
            <Typography>Loading Course Topics</Typography>
          </>
        )}
        {isError && (
          <Typography>
            Something went wrong while getting topics:
            <br /> {error}
          </Typography>
        )}
        <TopicModal courseId={courseId} />
      </Grid>
    </Box>
  );
};

export default TopicList;
