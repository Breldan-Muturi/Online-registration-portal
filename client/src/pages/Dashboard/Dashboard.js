import React from "react";
import useStyles from "./styles";
import { CourseList, SessionList } from "../../components";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectAllSessions } from "../../features/session/sessionSlice";
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
