import React from "react";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import CourseList from "../../CardList/Courses/CourseList";
import SessionList from "../../CardList/Sessions/SessionList";
import { useSelector } from "react-redux";
import { selectAllSessions } from "../../Features/api/sessionApiSlice";
import { selectCurrentUser } from "../../Features/global/authSlice";

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
