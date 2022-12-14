import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useCreateSessionMutation } from "../../Features/api/sessionApiSlice";
import {
  setStartDate,
  setEndDate,
  setVenue,
  setOnPremisesFee,
  setOnPremiesSlots,
  setOnlineFee,
  setOnlineSlots,
  toggleModal,
} from "../../Features/forms/sessionSlice";

const SessionModal = ({ courseId }) => {
  const classes = useStyles();
  const [createSession] = useCreateSessionMutation();
  const dispatch = useDispatch();

  const {
    startDate,
    endDate,
    venue,
    onPremisesFee,
    onPremisesSlots,
    onlineFee,
    onlineSlots,
    isOpen,
  } = useSelector((state) => state.session);

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
    await createSession(sessionData);
    dispatch(toggleModal());
  };
  return (
    <div>
      <Button
        size="small"
        startIcon={<UploadFileOutlined />}
        onClick={() => dispatch(toggleModal())}
        className={classes.submit}
      >
        Create a new session
      </Button>
      <Modal
        aria-labelledby="session-creation-modal"
        aria-describedby="modal-for-session-creation"
        open={isOpen}
        className={classes.modal}
        onClose={() => dispatch(toggleModal())}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Typography variant="subtitle1">Create A New Session</Typography>
            </AppBar>
            <form onSubmit={onSubmit} className={classes.div}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    value={startDate}
                    name="startDate"
                    id="startDate"
                    type="date"
                    autoComplete="off"
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                      position: "end",
                      color: "primary",
                    }}
                    label="Session Start Date"
                    onChange={(e) => dispatch(setStartDate(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    value={endDate}
                    name="endDate"
                    id="endDate"
                    type="date"
                    autoComplete="off"
                    variant="outlined"
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      position: "end",
                      color: "primary",
                    }}
                    label="Session End Date"
                    onChange={(e) => dispatch(setEndDate(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={venue}
                    name="venue"
                    id="venue"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session Venue"
                    onChange={(e) => dispatch(setVenue(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    value={onPremisesFee}
                    name="onPremisesFee"
                    id="onPremisesFee"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session On Premises Fee"
                    onChange={(e) => dispatch(setOnPremisesFee(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    value={onPremisesSlots}
                    name="onPremisesSlots"
                    id="onPremisesSlots"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session On Premises Slots"
                    onChange={(e) =>
                      dispatch(setOnPremiesSlots(e.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    value={onlineFee}
                    name="onlineFee"
                    id="onlineFee"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session Online Fee"
                    onChange={(e) => dispatch(setOnlineFee(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    value={onlineSlots}
                    name="onlineSlots"
                    id="onlineSlots"
                    type="number"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    label="Session Online Slots"
                    onChange={(e) => dispatch(setOnlineSlots(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className={classes.submit}
                  >
                    Create New Session
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SessionModal;
