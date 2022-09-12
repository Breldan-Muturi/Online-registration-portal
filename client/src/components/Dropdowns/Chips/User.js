import React from "react";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import { useGetUsersQuery } from "../../../Features/api/usersApiSlice";
import { toggleParticipant } from "../../../Features/forms/customApplicationSlice";
import { useDispatch } from "react-redux";

const User = ({ userId }) => {
  const dispatch = useDispatch();
  const {
    user: { firstName, lastName },
  } = useGetUsersQuery("users", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <Chip
      size="small"
      label={`${firstName} ${lastName}`}
      deleteIcon={
        <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
      }
      color="primary"
      clickable
      onDelete={() => dispatch(toggleParticipant(userId))}
    />
  );
};

export default User;
