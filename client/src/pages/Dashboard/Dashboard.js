import React from "react";
import useStyles from "./styles";
import { CourseList, SessionList } from "../../containers";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllSessions } from "../../features/session/sessionApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

const DashboardPage = () => {
  const classes = useStyles();
  const user = useSelector(selectCurrentUser);
  const sessions = useSelector(selectAllSessions);
  return (
    <>
      <div className={classes.header} />
      <CourseList user={user} />
      <Typography className={classes.title} variant="h2" p={2} color="error">
        Training Calendar
      </Typography>
      <SessionList user={user} sessions={sessions} />
    </>
  );
};

export default DashboardPage;
