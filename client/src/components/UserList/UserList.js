import React from "react";
import {
  Avatar,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  removeParticipants,
  setParticipants,
} from "../../features/application/customApplicationSlice";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../../features/user/usersApiSlice";
import { useStyles, MenuProps } from "./styles";

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
    <Grid item container xs={12} sm={6}>
      {isLoading && (
        <Grid
          container
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
                    <Avatar
                      className={classes.circle}
                      alt={`${mappedUser.firstName} ${mappedUser.lastName}'s avatar`}
                      src={mappedUser.avatar}
                    >
                      {mappedUser.firstName.substring(0, 2).toUpperCase()}
                    </Avatar>
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
