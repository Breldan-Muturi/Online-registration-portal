import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import useStyles from "./styles";
import User from "../../Components/Cards/User/User";
import { useSelector } from "react-redux";

const SelectedUsers = () => {
  const classes = useStyles();
  const { participants } = useSelector((state) => state.customApplication);
  return (
    <Grid
      xs={6}
      p={2}
      className={clsx(
        classes.selected,
        participants.length ? classes.selectedUsers : classes.noSelectedUsers
      )}
    >
      <Typography>
        {participants.length
          ? `You have added ${participants.length} ${
              participants.length > 1 ? "participants" : "participant"
            } to this application`
          : "You have not yet added participants to this application"}
      </Typography>
      {participants?.map((participantId) => (
        <User key={participantId} participantId={participantId} />
      ))}
    </Grid>
  );
};
export default SelectedUsers;
