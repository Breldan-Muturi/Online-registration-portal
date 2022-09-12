import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSessionsQuery } from "../../../Features/api/sessionApiSlice";
import { toggleModal } from "../../../Features/global/authSlice";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import { selectCurrentToken } from "../../../Features/global/authSlice";

const CourseItem = ({ courseId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const { course } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

  const {
    title,
    courseImage: { path },
  } = course;

  const { sessionsCount } = useGetSessionsQuery("sessions", {
    selectFromResult: ({ data }) => ({
      sessionsCount: data?.ids.filter(
        (sessionId) => data?.entities[sessionId].courseId === courseId
      ).length,
    }),
  });

  const onClick = () => {
    token ? navigate(`/course/${courseId}`) : dispatch(toggleModal());
  };

  return (
    <Grid xs={6} sm={6} md={4}>
      <Card className={classes.card} onClick={onClick}>
        <CardMedia
          className={classes.cover}
          image={path}
          title={title}
          classes={{
            img: classes.img,
          }}
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="subtitle2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color={sessionsCount > 0 ? "primary" : "error"}
          >
            {sessionsCount === 0 && "No scheduled sessions."}
            {sessionsCount === 1 && "1 Session"}
            {sessionsCount > 1 && `${sessionsCount} Sessions`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CourseItem;
