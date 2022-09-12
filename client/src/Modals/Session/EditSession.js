import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AppBar from "@mui/material/AppBar";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Unstable_Grid2";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleEdit } from "../../Features/lists/sessionListSlice";
import {
  useGetSessionsQuery,
  useUpdateSessionMutation,
} from "../../Features/api/sessionApiSlice";
import SessionCourses from "../../Components/Dropdowns/FormLabels/SessionCourses";
import MenuProps from "../../Helpers/MenuProps";
import venues from "../../Helpers/Venues";

const EditSession = ({ sessionId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { session } = useGetSessionsQuery("sessions", {
    selectFromResult: ({ data }) => ({
      session: data?.entities[sessionId],
    }),
  });
  const [updateSession, { isLoading, isSuccess, isError, error }] =
    useUpdateSessionMutation();

  const modalEdit = useSelector((state) => state.sessionList.modalEdit);

  const [startDate, setStartDate] = useState(session.startDate);
  const [endDate, setEndDate] = useState(session.endDate);
  const [venue, setVenue] = useState(session.venue);
  const [onPremisesFee, setOnPremisesFee] = useState(session.onPremisesFee);
  const [onPremisesSlots, setOnPremiesSlots] = useState(
    session.onPremisesSlots
  );
  const [onlineFee, setOnlineFee] = useState(session.onlineFee);
  const [onlineSlots, setOnlineSlots] = useState(session.onlineSlots);
  const [courseId, setCourseId] = useState(session.courseId);

  const onSubmit = async (e) => {
    e.preventDefault();
    const sessionData = {
      startDate,
      endDate,
      venue,
      onPremisesFee,
      onPremisesSlots,
      onlineFee,
      onlineSlots,
      courseId,
    };
    await updateSession({ sessionData, sessionId });
    isSuccess && dispatch(toggleEdit(""));
  };
  return (
    <div>
      <Button
        size="small"
        startIcon={<EditIcon />}
        onClick={() => dispatch(toggleEdit(sessionId))}
      >
        Edit Session
      </Button>
      <Modal
        aria-labelledby="session-creation-modal"
        aria-describedby="modal-for-session-creation"
        open={modalEdit === sessionId}
        className={classes.modal}
        onClose={() => dispatch(toggleEdit(""))}
        closeAfterTransition
      >
        <Fade in={modalEdit === sessionId}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Typography variant="subtitle1">Update this Session</Typography>
            </AppBar>
            <form onSubmit={onSubmit} className={classes.div}>
              <Grid container spacing={2}>
                <SessionCourses courseId={courseId} setCourseId={setCourseId} />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container xs={12} spacing={2} p={1}>
                    <Grid xs={6}>
                      <DatePicker
                        fullWidth
                        id="startDate"
                        label="Program Start Date"
                        value={startDate}
                        onChange={(newValue) =>
                          setStartDate(newValue.toISOString())
                        }
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                      />
                    </Grid>
                    <Grid xs={6}>
                      <DatePicker
                        id="endDate"
                        label="Program End Date"
                        value={endDate}
                        onChange={(newValue) =>
                          setEndDate(newValue.toISOString())
                        }
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <Grid xs={12}>
                  <TextField
                    value={venue}
                    name="venue"
                    id="venue"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    select
                    SelectProps={{
                      MenuProps: MenuProps,
                      defaultValue: "",
                    }}
                    label="Session Venue"
                    onChange={(e) => setVenue(e.target.value)}
                  >
                    {venues.map((mappedVenue, index) => (
                      <ListItemButton
                        key={index}
                        value={mappedVenue.value}
                        divider
                        dense
                        selected={mappedVenue.value === venue}
                      >
                        <ListItemText primary={mappedVenue.label} />
                      </ListItemButton>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <TextField
                    value={onPremisesFee}
                    name="onPremisesFee"
                    id="onPremisesFee"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session On Premises Fee"
                    onChange={(e) => setOnPremisesFee(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <TextField
                    value={onPremisesSlots}
                    name="onPremisesSlots"
                    id="onPremisesSlots"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session On Premises Slots"
                    onChange={(e) => setOnPremiesSlots(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <TextField
                    value={onlineFee}
                    name="onlineFee"
                    id="onlineFee"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session Online Fee"
                    onChange={(e) => setOnlineFee(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <TextField
                    value={onlineSlots}
                    name="onlineSlots"
                    id="onlineSlots"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session Online Slots"
                    onChange={(e) => setOnlineSlots(e.target.value)}
                  />
                </Grid>
                <Grid xs={12}>
                  <LoadingButton
                    startIcon={<UpdateIcon />}
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className={classes.submit}
                  >
                    {isLoading
                      ? "Updating this session..."
                      : "Update this Session"}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditSession;
