import React from "react";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import {
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import useStyles from "./styles";
import { selectAllCourses } from "../../features/course/courseApiSlice";

const SessionItem = ({ session }) => {
  const classes = useStyles();
  //Optimize with a selector for courses by sessionId
  const courses = useSelector(selectAllCourses);
  const course = courses?.find((course) => course._id === session.courseId);
  Number.prototype.format = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const options = { year: "numeric", month: "short", day: "numeric" };
  const startDate = new Date(session.startDate).toDateString("en-us", options);
  const endDate = new Date(session.endDate).toDateString("en-us", options);
  const title = `${startDate} to ${endDate}`;

  return (
    <Card className={classes.card}>
      <CardHeader title={title} classes={{ title: classes.title }} />
      <Divider variant="middle" />
      <CardContent>
        <Typography className={classes.course}>{course?.title}</Typography>
        <Typography>
          On Premises Fee: <b>Ksh {session.onPremisesFee.format()}</b>
        </Typography>
        <Typography>
          Session venue: <b>{session.venue}</b>
        </Typography>
        <Typography>
          On Premises Slots:{" "}
          <b>
            {session.onPremisesSlots - session.onPremisesSlotsTaken}/
            {session.onPremisesSlots}
          </b>
        </Typography>
        <Typography>
          Online Fee: <b>Ksh {session.onlineFee.format()}</b>
        </Typography>
        <Typography>
          Online Slots:{" "}
          <b>
            {session.onlineSlots - session.onlineSlotsTaken}/
            {session.onlineSlots}
          </b>
        </Typography>
      </CardContent>
      <ButtonBase className={classes.button}>
        <CardActions className={classes.actions}>
          <Typography>Apply Now</Typography>
          <SendIcon />
        </CardActions>
      </ButtonBase>
    </Card>
  );
};

export default SessionItem;
