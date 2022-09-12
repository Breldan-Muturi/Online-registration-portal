import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomAvatar from "../../../Custom/CustomAvatar";
import { useGetUsersQuery } from "../../../Features/api/usersApiSlice";
import useStyles from "./styles";

const Approver = ({ approvedBy }) => {
  const classes = useStyles();
  const {
    user: { firstName, lastName, avatar, email },
  } = useGetUsersQuery("users", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[approvedBy],
    }),
  });

  return (
    <Card variant="outlined">
      <div className={classes.info}>
        <CustomAvatar
          alt={`${firstName} ${lastName}'s profile photo`}
          src={avatar}
        >
          {firstName.substring(0, 2).toUpperCase()}
        </CustomAvatar>
        <CardContent className={classes.cardContent}>
          <Typography variant="h3">{`${firstName} ${lastName}`}</Typography>
          <Typography variant="body2">{email}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default Approver;
