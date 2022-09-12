import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircle from "@mui/icons-material/CheckCircle";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import CustomAvatar from "../../../Custom/CustomAvatar";
import { useGetUsersQuery } from "../../../Features/api/usersApiSlice";
import useStyles from "./styles";

const User = ({ participantId }) => {
  const classes = useStyles();
  const {
    user: { firstName, lastName, avatar, email },
  } = useGetUsersQuery("users", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[participantId],
    }),
  });
  return (
    <Card className={classes.selectedCard} variant="outlined">
      <div className={classes.info}>
        <CustomAvatar
          alt={`${firstName} ${lastName}'s profile photo`}
          src={avatar}
          className={classes.circle}
        >
          {firstName.substring(0, 2).toUpperCase()}
        </CustomAvatar>
        <CardContent className={classes.cardContent}>
          <Typography variant="h3">{`${firstName} ${lastName}`}</Typography>
          <Typography variant="body2">{email}</Typography>
        </CardContent>
      </div>
      <CardActions classes={{ root: classes.actions }}>
        <Button
          disabled
          size="small"
          className={classes.prerequisites}
          startIcon={<CheckCircle />}
        >
          Prerequisite Courses Submitted
        </Button>
        <Button size="small" color="error" startIcon={<HighlightOffOutlined />}>
          Remove participant
        </Button>
      </CardActions>
    </Card>
  );
};

export default User;
