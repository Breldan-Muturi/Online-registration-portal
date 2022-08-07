import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Typography, Grid, Box } from "@material-ui/core";
import { SessionItem, SessionModal } from "..";
import useStyles from "./styles";
import Pagination from "@material-ui/lab/Pagination";
import { useParams } from "react-router-dom";
import {
  selectAllSessions,
  getSessionsStatus,
  getSessionsError,
} from "../../features/session/sessionSlice";

const SessionList = () => {
  const { courseId } = useParams();
  const sessions = useSelector(selectAllSessions);
  const status = useSelector(getSessionsStatus);
  const message = useSelector(getSessionsError);
  const listSessions = courseId
    ? sessions.filter((session) => session.courseId === courseId)
    : sessions;

  const classes = useStyles();
  const [sessionPage, setSessionPage] = useState(1);

  return (
    <Box p={3} className={classes.box}>
      {listSessions?.length > 0 && status === "success" && (
        <>
          <Grid container alignItems="stretch" direction="row" spacing={3}>
            {listSessions
              .slice((sessionPage - 1) * 6, (sessionPage - 1) * 6 + 6)
              .map((listSession) => (
                <Grid key={listSession._id} item xs={6} sm={6} md={4}>
                  <SessionItem key={listSession._id} session={listSession} />
                </Grid>
              ))}
          </Grid>
          <Pagination
            count={Math.ceil(listSessions?.length / 6)}
            onChange={(_, value) => setSessionPage(value)}
          />
        </>
      )}
      <Grid container direction="column">
        {listSessions?.length === 0 && status === "success" && (
          <Typography color="error">
            There are no scheduled sessions for this course
          </Typography>
        )}
        {status === "loading" && (
          <Grid
            item
            container
            direction="row"
            spacing={5}
            justifyContent="flex-start"
          >
            <CircularProgress />
            <Typography>Loading Portal Sessions</Typography>
          </Grid>
        )}
        {status === "failed" && (
          <Typography>
            Something went wrong while getting sessions:
            <br /> {message}
          </Typography>
        )}
        {courseId && <SessionModal courseId={courseId} />}
      </Grid>
    </Box>
  );
};

export default SessionList;
