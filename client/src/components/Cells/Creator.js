import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomAvatar from "../../Custom/CustomAvatar";
import { useGetUsersQuery } from "../../Features/api/usersApiSlice";

const Creator = ({ userId, dense }) => {
  const {
    user: { firstName, lastName, email, avatar },
  } = useGetUsersQuery("users", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  return (
    <Stack direction="row" gap={1}>
      <CustomAvatar
        size={dense && "small"}
        alt={`${firstName} ${lastName}'s profile photo`}
        src={avatar}
      >
        {firstName.substring(0, 2).toUpperCase()}
      </CustomAvatar>
      <Stack direction="column">
        <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
        <Typography variant="body2">{email}</Typography>
      </Stack>
    </Stack>
  );
};

export default Creator;
