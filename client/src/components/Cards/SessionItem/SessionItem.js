import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ApplyButton from "../../../Custom/ApplyButton";
import useStyles from "./styles";
import { toggleModal } from "../../../Features/global/authSlice";
import { selectCourseById } from "../../../Features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../../Features/global/authSlice";
import { useNavigate } from "react-router-dom";

const SessionItem = ({ session }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
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

  const handleClick = () => {
    if (!session && !token) {
      dispatch(toggleModal());
    } else if (session && !token) {
      navigate("/");
    }
  };

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
      <ApplyButton onClick={handleClick}>
        <CardActions className={classes.actions}>
          <Typography>Apply Now</Typography>
          <SendIcon />
        </CardActions>
      </ApplyButton>
    </Card>
  );
};

export default SessionItem;
