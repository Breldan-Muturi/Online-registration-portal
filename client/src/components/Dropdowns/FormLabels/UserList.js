import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuProps from "../../../Helpers/MenuProps";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setParticipants } from "../../../Features/forms/customApplicationSlice";
import { useGetUsersQuery } from "../../../Features/api/usersApiSlice";
import UserMenu from "../MenuItems/UserMenu";
import User from "../Chips/User";

const UserList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { participants } = useSelector((state) => state.customApplication);
  const {
    data: users,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery("users", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={2} p={1}>
        <CircularProgress size="small" />
        <Typography variant="body2">Loading available participants</Typography>
      </Stack>
    );
  }
  if (isError) {
    content = (
      <Typography color="error" className={classes.notify}>
        {`Something went wrong <br /> ${error}`}
      </Typography>
    );
  }
  if (isSuccess) {
    const { ids } = users;
    if (!ids.length) {
      content = (
        <Typography color="error" variant="body2">
          There are no available participants to include for this application
        </Typography>
      );
    }
    if (ids.length) {
      const isAllSelected =
        ids.length > 0 && participants.length === ids.length;

      content = (
        <FormControl variant="outlined" fullWidth>
          <InputLabel
            htmlFor="select-application-participants"
            id="select-application-participants"
          >
            Select application participants
          </InputLabel>
          <Select
            labelId="select-application-participants"
            label="select-application-participants"
            multiple
            value={participants}
            renderValue={(participants) => (
              <div className={classes.chips}>
                {ids
                  .filter((filteredId) => participants.includes(filteredId))
                  .map((participantId) => (
                    <User key={participantId} userId={participantId} />
                  ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            <ListItemButton
              key="all"
              value="all"
              dense
              divider
              onClick={() => dispatch(setParticipants(ids))}
            >
              <ListItemText
                primary={`${
                  participants.length
                    ? "Deselect the above"
                    : "Select all available"
                } participants`}
              />
              <Checkbox
                color="primary"
                classes={{ indeterminate: classes.indeterminateColor }}
                indeterminate={
                  participants.length > 0 && ids.length > participants.length
                }
                edge="end"
                inputProps={{
                  "aria-labelledby": `${
                    participants.length
                      ? "Deselect the above"
                      : "Select all available"
                  } participants`,
                }}
                checked={isAllSelected}
              />
            </ListItemButton>
            {ids.map((userId) => (
              <UserMenu key={userId} value={userId} userId={userId} />
            ))}
          </Select>
        </FormControl>
      );
    }
  }
  return (
    <Grid xs={6} p={2}>
      {content}
    </Grid>
  );
};

export default UserList;
