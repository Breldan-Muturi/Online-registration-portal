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
} from "@mui/material";
import Pagination from "@mui/lab/Pagination";
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
      <Grid container direction="column">
        {!isSuccess && (
          <>
            {isLoading && <CircularProgress />}
            <Typography>
              {isLoading && "Loading Course Topics"}{" "}
              {isError &&
                `Something went wrong while getting topics:
            <br /> ${error}`}
            </Typography>
          </>
        )}
        {isSuccess && (
          <>
            {topics.length >= 1 ? (
              <List
                spacing={3}
                aria-labelledby={`${course.title} Course Topics`}
                subheader={
                  <ListSubheader
                    component="h3"
                    className={classes.subheader}
                    id="topics-list-subheader"
                  >
                    {`Topics covered under ${course.title}`}
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
                              {topics.indexOf(mappedTopic) + 1}.{" "}
                              {mappedTopic.title}
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
                {Math.ceil(topics.length / 6) > 1 && (
                  <Pagination
                    count={Math.ceil(topics.length / 6)}
                    onChange={(_, value) => setTopicPage(value)}
                  />
                )}
              </List>
            ) : (
              <Typography color="error">
                There are no published topics for this course
              </Typography>
            )}
            <TopicModal courseId={courseId} />
          </>
        )}
      </Grid>
      <Grid container direction="column"></Grid>
    </Box>
  );
};

export default TopicList;
