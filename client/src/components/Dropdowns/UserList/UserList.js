import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomAvatar from "../../../Custom/CustomAvatar";
import MenuProps from "../../../Helpers/MenuProps";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  removeParticipants,
  setParticipants,
} from "../../../Features/forms/customApplicationSlice";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../../../Features/api/usersApiSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isSuccess, isLoading, isError, error } = useGetUsersQuery();
  const users = useSelector(selectAllUsers);
  const { participants } = useSelector((state) => state.customApplication);
  const isAllSelected =
    users?.length > 0 && participants?.length === users?.length;

  const handleParticipants = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      dispatch(
        setParticipants(
          isAllSelected ? [] : users?.map((mappedUser) => mappedUser._id)
        )
      );
      return;
    }
    dispatch(setParticipants(value));
  };
  const handleDelete = (mappedParticipant) => () => {
    dispatch(removeParticipants(mappedParticipant));
  };
  return (
    <Grid xs={6} p={2}>
      {isLoading && (
        <Grid
          className={classes.notify}
          alignItems="center"
          justifyContent="flex-start"
          direction="row"
        >
          <CircularProgress />
          <Typography variant="body1" classes={{ body1: classes.textNotify }}>
            Loading available participants ...
          </Typography>
        </Grid>
      )}
      {isError && (
        <Typography color="error" className={classes.notify}>
          {`Something went wrong <br /> ${error}`}
        </Typography>
      )}
      {isSuccess && (
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
            onChange={handleParticipants}
            renderValue={(participants) => (
              <div className={classes.chip}>
                {users
                  .filter((filteredUser) =>
                    participants.includes(filteredUser._id)
                  )
                  .map((mappedUser) => (
                    <Chip
                      key={mappedUser._id}
                      label={`${mappedUser.firstName} ${mappedUser.lastName}`}
                      clickable
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                      color="primary"
                      className={classes.chip}
                      onDelete={handleDelete(mappedUser._id)}
                    />
                  ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem key="all" value="all">
              <ListItemText primary="Select all available participants" />
              <Checkbox
                color="primary"
                classes={{ indeterminate: classes.indeterminateColor }}
                indeterminate={
                  users.length > 0 && users.length > participants.length
                }
                edge="end"
                inputProps={{
                  "aria-labelledby": "Select all participants",
                }}
                checked={isAllSelected}
              />
            </MenuItem>
            {users.map((mappedUser) => {
              const labelId = `checkbox-list-secondary-label-select-${mappedUser.firstName} ${mappedUser.lastName}`;
              return (
                <MenuItem key={mappedUser._id} value={mappedUser._id}>
                  <ListItemAvatar>
                    <CustomAvatar
                      sizes="small"
                      className={classes.circle}
                      alt={`${mappedUser.firstName} ${mappedUser.lastName}'s avatar`}
                      src={mappedUser.avatar}
                    >
                      {mappedUser.firstName.substring(0, 2).toUpperCase()}
                    </CustomAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`${mappedUser.firstName} ${mappedUser.lastName}`}
                    secondary={mappedUser.email}
                  />
                  <Checkbox
                    color="primary"
                    edge="end"
                    inputProps={{ "aria-labelledby": labelId }}
                    checked={participants.includes(mappedUser._id)}
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Grid>
  );
};

export default UserList;
