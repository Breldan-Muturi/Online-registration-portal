import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllSessions } from "../../features/session/sessionApiSlice";
import { toggleModal } from "../../features/auth/authSlice";
import { selectCourseById } from "../../features/course/courseApiSlice";

const CourseItem = ({ courseId, user }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessions = useSelector(selectAllSessions);
  const course = useSelector((state) => selectCourseById(state, courseId));
  const courseSessions = sessions.filter(
    (session) => session.courseId === courseId
  );

  const onClick = () => {
    user ? navigate(`/course/${courseId}`) : dispatch(toggleModal());
  };

  return (
    <Grid key={courseId} item xs={6} sm={6} md={4}>
      <Card className={classes.card} onClick={onClick}>
        <CardMedia
          className={classes.cover}
          image={course.courseImage.path}
          title={course.title}
          classes={{
            img: classes.img,
          }}
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="subtitle2">
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color={courseSessions?.length > 0 ? "primary" : "error"}
          >
            {courseSessions?.length === 0 && "No scheduled sessions."}
            {courseSessions?.length === 1 && "1 Session"}
            {courseSessions?.length > 1 && `${courseSessions.length} Sessions`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CourseItem;
