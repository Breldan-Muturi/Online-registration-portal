import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllSessions } from "../../../Features/api/sessionApiSlice";
import { toggleModal } from "../../../Features/global/authSlice";
import { selectCourseById } from "../../../Features/api/courseApiSlice";
import { selectCurrentToken } from "../../../Features/global/authSlice";

const CourseItem = ({ courseId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const sessions = useSelector(selectAllSessions);
  const course = useSelector((state) => selectCourseById(state, courseId));
  const courseSessions = sessions.filter(
    (session) => session.courseId === courseId
  );

  const onClick = () => {
    token ? navigate(`/course/${courseId}`) : dispatch(toggleModal());
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
