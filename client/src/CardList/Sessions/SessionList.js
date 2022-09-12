import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SessionItem from "../../Components/Cards/SessionItem/SessionItem";
import SessionModal from "../../Modals/Session/SessionModal";
import useStyles from "./styles";
import Pagination from "@mui/material/Pagination";
import { useParams } from "react-router-dom";
import { useGetSessionsQuery } from "../../Features/api/sessionApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";

const SessionList = () => {
  const classes = useStyles();
  const { isAdmin } = useIsAdmin();
  const { courseId } = useParams();
  const {
    data: sessions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSessionsQuery("sessions", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [sessionPage, setSessionPage] = useState(1);

  let header;
  let content;

  if (isLoading) {
    header = (
      <Stack direction="row" gap={1}>
        <CircularProgress />
        <Typography>Loading portal sessions ...</Typography>
      </Stack>
    );
  }

  if (isError) {
    header = (
      <Typography>{`Something went wrong loading sessions ${error?.data?.message}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids, entities } = sessions;
    let sessionIds;
    if (courseId) {
      sessionIds = ids.filter(
        (sessionId) => entities[sessionId].courseId === courseId
      );
    } else {
      sessionIds = [...ids];
    }

    if (!sessionIds.length) {
      header = (
        <Typography>
          {`There are no scheduled sessions ${
            courseId ? "for this course" : "on the portal"
          } at this time`}
        </Typography>
      );
    }

    if (sessionIds.length) {
      header = (
        <Typography variant="h2" color={courseId ? "primary" : "error"}>
          {`Training calendar with ${sessionIds.length} scheduled ${
            sessionIds.length > 1 ? "sessions" : "session"
          }`}
        </Typography>
      );
      content = (
        <>
          <Grid container xs={12} spacing={3}>
            {sessionIds
              .slice((sessionPage - 1) * 6, (sessionPage - 1) * 6 + 6)
              .map((sessionId) => (
                <SessionItem key={sessionId} sessionId={sessionId} />
              ))}
          </Grid>
          <Pagination
            count={Math.ceil(sessionIds?.length / 6)}
            onChange={(_, value) => setSessionPage(value)}
          />
        </>
      );
    }
  }

  return (
    <Box p={3} className={classes.box}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {header}
        {isAdmin && <SessionModal courseId={courseId} />}
      </Stack>
      {content}
    </Box>
  );
};

export default SessionList;
