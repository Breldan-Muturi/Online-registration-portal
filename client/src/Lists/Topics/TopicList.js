import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/lab/Pagination";
import Subheader from "../../Custom/Subheader";
import CenterList from "../../Custom/CenterList";
import TopicModal from "../../Modals/Topic/TopicModal";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { selectCourseById } from "../../Features/api/courseApiSlice";
import {
  useGetTopicsQuery,
  selectTopicsByCourse,
} from "../../Features/api/topicApiSlice";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../Features/global/authSlice";
import { ROLES } from "../../Config/roles";

const TopicList = () => {
  const { courseId } = useParams();
  const classes = useStyles();
  const { roles } = useSelector(selectCurrentUser);
  const { title } = useSelector((state) => selectCourseById(state, courseId));
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
              <CenterList
                component="article"
                spacing={3}
                aria-labelledby={`${title} Course Topics`}
                subheader={
                  <Subheader component="h3" id="topics-list-subheader">
                    {`Topics covered under ${title}`}
                  </Subheader>
                }
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
              </CenterList>
            ) : (
              <Typography color="error">
                There are no published topics for this course
              </Typography>
            )}
            {Object.values(roles).includes(ROLES.Admin) && (
              <TopicModal courseId={courseId} />
            )}
          </>
        )}
      </Grid>
      <Grid container direction="column"></Grid>
    </Box>
  );
};

export default TopicList;
