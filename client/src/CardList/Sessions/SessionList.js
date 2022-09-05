import React, { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SessionItem from "../../Components/Cards/SessionItem/SessionItem";
import SessionModal from "../../Modals/Session/SessionModal";
import useStyles from "./styles";
import Pagination from "@mui/material/Pagination";
import { useParams } from "react-router-dom";
import {
  useGetSessionsQuery,
  selectAllSessions,
} from "../../Features/api/sessionApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";

const SessionList = () => {
  const { isLoading, isSuccess, isError, error } = useGetSessionsQuery();
  const { courseId } = useParams();
  const sessions = useSelector(selectAllSessions);
  const { isAdmin } = useIsAdmin();
  const listSessions = courseId
    ? sessions.filter((session) => session.courseId === courseId)
    : sessions;

  const classes = useStyles();
  const [sessionPage, setSessionPage] = useState(1);

  return (
    <Box p={3} className={classes.box}>
      {listSessions?.length > 0 && isSuccess && (
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
        {listSessions?.length === 0 && isSuccess && (
          <Typography color="error">
            There are no scheduled sessions for this course
          </Typography>
        )}
        {isLoading && (
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
        {isError && (
          <Typography>
            Something went wrong while getting sessions:
            <br /> {error}
          </Typography>
        )}
        {courseId && isAdmin && <SessionModal courseId={courseId} />}
      </Grid>
    </Box>
  );
};

export default SessionList;
