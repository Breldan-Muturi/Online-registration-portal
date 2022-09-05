import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
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
import { useGetUsersQuery } from "../Features/api/usersApiSlice";
const ParticipantsInfo = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const user = useSelector(selectCurrentUser);
  const { participants, isOnlyParticipant } = useSelector(
    (state) => state.customApplication
  );

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={3}>
        <CircularProgress />
        <Typography>Loading available participants</Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography color="error">{`Error loading available participants ${error?.data}`}</Typography>
    );
  }

  if (isSuccess) {
    content = (
      <>
        {!isOnlyParticipant && (
          <Grid direction="column" xs={12}>
            <Typography variant="h3">Participation Details</Typography>
            <Typography>
              Select participants from your organizations.
            </Typography>
            <Typography variant="subtitle2" color="primary">
              Enter your desired participants email address.
            </Typography>
          </Grid>
        )}
        <Grid container xs={12} justifyContent="space-between">
          {!isOnlyParticipant && <UserList />}
          <SelectedUsers />
        </Grid>
        <Grid xs={12}>
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
  }

  return (
    <Grid container xs={12} columnSpacing={2}>
      {content}
    </Grid>
  );
};

export default ParticipantsInfo;
