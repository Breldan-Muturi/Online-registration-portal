import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import UserList from "../Components/Dropdowns/UserList/UserList";
import SelectedUsers from "../CardList/Users/SelectedUsers";
import {
  toggleIsOnlyParticipant,
  setParticipants,
  addSingleParticipant,
} from "../Features/forms/customApplicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../Features/global/authSlice";
const ParticipantsInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { participants, isOnlyParticipant } = useSelector(
    (state) => state.customApplication
  );
  return (
    <>
      {!isOnlyParticipant && (
        <Grid item container direction="column" xs={12}>
          <Typography variant="h3">Participation Details</Typography>
          <Typography>Select participants from your organizations.</Typography>
          <Typography variant="subtitle2" color="primary">
            Enter your desired participants email address.
          </Typography>
        </Grid>
      )}
      <Grid item container direction="row" justifyContent="space-between">
        {!isOnlyParticipant && <UserList />}
        <SelectedUsers />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          name="isOnlyParticipant"
          value="isOnlyParticipant"
          control={
            <Checkbox
              checked={
                participants.length === 1 && participants.includes(user.id)
              }
              onChange={() => (
                // eslint-disable-next-line
                dispatch(toggleIsOnlyParticipant()),
                dispatch(
                  participants.includes(user.id)
                    ? setParticipants([])
                    : addSingleParticipant(user.id)
                )
              )}
              name="isOnlyParticipant"
              color="primary"
            />
          }
          label="I am the only participant for this application."
        />
      </Grid>
    </>
  );
};

export default ParticipantsInfo;
