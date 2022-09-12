import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
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
import options from "../../../Helpers/DateOptions";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSessionsQuery } from "../../../Features/api/sessionApiSlice";
import useIsAdmin from "../../../Hooks/useIsAdmin";
import DeleteSession from "../../Dialogs/DeleteSession";
import EditSession from "../../../Modals/Session/EditSession";
import { setSessionApplication } from "../../../Features/global/navSlice";

const SessionItem = ({ sessionId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isAdmin } = useIsAdmin();
  const {
    session: {
      startDate,
      endDate,
      courseId,
      onPremisesFee,
      onPremisesSlots,
      onPremisesSlotsTaken,
      venue,
      onlineFee,
      onlineSlots,
      onlineSlotsTaken,
    },
  } = useGetSessionsQuery("sessions", {
    selectFromResult: ({ data }) => ({
      session: data?.entities[sessionId],
    }),
  });

  const start = new Date(startDate).toDateString("en-US", options);
  const end = new Date(endDate).toDateString("en-US", options);

  const { courseTitle, isAvailableCourse } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      courseTitle: data?.entities[courseId]?.title ?? "No associated course",
      isAvailableCourse: data?.ids.includes(courseId),
    }),
  });

  const title = `${start} to ${end}`;

  const handleClick = () => {
    if (!sessionId && !token) {
      dispatch(toggleModal());
    } else if (sessionId && !token) {
      navigate("/");
    } else if (sessionId && token && isAvailableCourse) {
      navigate(`/course/${courseId}`);
      dispatch(setSessionApplication(sessionId));
    }
  };

  return (
    <Grid xs={4}>
      <Card className={classes.card}>
        <CardHeader title={title} classes={{ title: classes.title }} />
        <Divider variant="middle" />
        <CardContent>
          <Typography sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            {courseTitle}
          </Typography>
          <Typography>
            On Premises Fee:{" "}
            <b>
              Ksh{" "}
              {onPremisesFee
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </b>
          </Typography>
          <Typography>
            Session venue: <b>{venue}</b>
          </Typography>
          <Typography>
            On Premises Slots:{" "}
            <b>
              {onPremisesSlots - onPremisesSlotsTaken}/{onPremisesSlots}
            </b>
          </Typography>
          <Typography>
            Online Fee:{" "}
            <b>
              Ksh{" "}
              {onlineFee.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </b>
          </Typography>
          <Typography>
            Online Slots:{" "}
            <b>
              {onlineSlots - onlineSlotsTaken}/{onlineSlots}
            </b>
          </Typography>
        </CardContent>
        {isAdmin ? (
          <CardActions sx={{ marginTop: "auto", marginLeft: "auto" }}>
            <EditSession sessionId={sessionId} />
            <DeleteSession sessionId={sessionId} />
          </CardActions>
        ) : (
          <ApplyButton onClick={handleClick}>
            <CardActions className={classes.actions}>
              <Typography>Apply Now</Typography>
              <SendIcon />
            </CardActions>
          </ApplyButton>
        )}
      </Card>
    </Grid>
  );
};

export default SessionItem;
