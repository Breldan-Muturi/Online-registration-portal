import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckCircle from "@mui/icons-material/CheckCircle";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import React from "react";
import { useSelector } from "react-redux";
import {
  useGetUsersQuery,
  selectAllUsers,
} from "../../features/user/usersApiSlice";
import useStyles from "./styles";
import { CustomAvatar } from "../../Custom";

const SelectedUsers = () => {
  const classes = useStyles();
  const { isSuccess, isLoading, isError, error } = useGetUsersQuery();
  const users = useSelector(selectAllUsers);
  const { participants } = useSelector((state) => state.customApplication);
  return (
    <Grid
      container
      direction="column"
      classes={{
        root: classes.selected,
        container: participants.length
          ? classes.selectedUsers
          : classes.noSelectedUsers,
      }}
    >
      {isLoading && <CircularProgress />}
      <Typography>
        {isLoading && "Loading your application participants ..."}
        {isError && `Failed to load selected Participants <br/> ${error}`}
        {isSuccess &&
          (participants.length
            ? `You have added ${participants.length} ${
                participants.length > 1 ? "participants" : "participant"
              } to this application`
            : "You have not yet added participants to this application")}
      </Typography>
      {isSuccess &&
        users
          .filter((filteredUser) => participants.includes(filteredUser._id))
          .map((mappedUser) => (
            <Card
              key={mappedUser._id}
              className={classes.selectedCard}
              variant="outlined"
            >
              <div className={classes.info}>
                <CustomAvatar
                  alt={`${mappedUser.firstName} ${mappedUser.lastName}'s profile photo`}
                  src={mappedUser.avatar}
                  className={classes.circle}
                >
                  {mappedUser.firstName.substring(0, 2).toUpperCase()}
                </CustomAvatar>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h3">{`${mappedUser.firstName} ${mappedUser.lastName}`}</Typography>
                  <Typography variant="body2">{mappedUser.email}</Typography>
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
                <Button
                  size="small"
                  color="error"
                  startIcon={<HighlightOffOutlined />}
                >
                  Remove participant
                </Button>
              </CardActions>
            </Card>
          ))}
    </Grid>
  );
};
export default SelectedUsers;
