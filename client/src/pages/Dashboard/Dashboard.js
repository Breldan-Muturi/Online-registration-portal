import React from "react";
import useStyles from "./styles";
import CourseList from "../../CardList/Courses/CourseList";
import SessionList from "../../CardList/Sessions/SessionList";

const DashboardPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.header} />
      <CourseList />
      <SessionList />
    </>
  );
};

export default DashboardPage;
