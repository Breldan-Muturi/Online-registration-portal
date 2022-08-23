import React from "react";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import useStyles from "./styles";
import { selectCourseById } from "../../features/course/courseApiSlice";
import { ApplyButton } from "../../Custom";

const SessionItem = ({ session }) => {
  const classes = useStyles();
  const course = useSelector((state) =>
    selectCourseById(state, session.courseId)
  );

  const options = { year: "numeric", month: "short", day: "numeric" };
  const startDate = new Date(session.startDate).toDateString("en-us", options);
  const endDate = new Date(session.endDate).toDateString("en-us", options);
  const title = `${startDate} to ${endDate}`;
  const onPremisesFee = session.onPremisesFee
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  const onlineFee = session.onlineFee
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return (
    <Card className={classes.card}>
      <CardHeader title={title} classes={{ title: classes.title }} />
      <Divider variant="middle" />
      <CardContent>
        <Typography sx={{ fontWeight: "bold", marginBottom: "16px" }}>
          {course?.title}
        </Typography>
        <Typography>
          On Premises Fee: <b>Ksh {onPremisesFee}</b>
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
          Online Fee: <b>Ksh {onlineFee}</b>
        </Typography>
        <Typography>
          Online Slots:{" "}
          <b>
            {session.onlineSlots - session.onlineSlotsTaken}/
            {session.onlineSlots}
          </b>
        </Typography>
      </CardContent>
      <ApplyButton>
        <CardActions className={classes.actions}>
          <Typography>Apply Now</Typography>
          <SendIcon />
        </CardActions>
      </ApplyButton>
    </Card>
  );
};

export default SessionItem;
