import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import CustomAvatar from "../../../Custom/CustomAvatar";
import { useGetUsersQuery } from "../../../Features/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleParticipant } from "../../../Features/forms/customApplicationSlice";

const UserMenu = ({ userId }) => {
  const dispatch = useDispatch();
  const { participants } = useSelector((state) => state.customApplication);
  const {
    user: { firstName, lastName, email, avatar },
  } = useGetUsersQuery("users", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const labelId = `checkbox-list-secondary-label-${
    participants.includes(userId) ? "Des" : "s"
  }elect-${firstName} ${lastName}`;
  return (
    <ListItemButton
      divider
      selected={participants.includes(userId)}
      onClick={() => dispatch(toggleParticipant(userId))}
    >
      <ListItemAvatar>
        <CustomAvatar alt={`${firstName} ${lastName}'s avatar`} src={avatar}>
          {firstName.substring(0, 2).toUpperCase()}
        </CustomAvatar>
      </ListItemAvatar>
      <ListItemText
        id={labelId}
        primary={`${firstName} ${lastName}`}
        secondary={email}
      />
      <Checkbox
        color="primary"
        edge="end"
        inputProps={{ "aria-labelledby": labelId }}
        checked={participants.includes(userId)}
      />
    </ListItemButton>
  );
};

export default UserMenu;
