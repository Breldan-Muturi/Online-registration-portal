import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById } from "../../Features/api/usersApiSlice";
import {
  expandParticipant,
  toggleParticipant,
} from "../../Features/lists/participantListSlice";
import CustomAvatar from "../../Custom/CustomAvatar";
import CustomListIcon from "../../Custom/CustomListIcon";

const Participant = ({ participantId }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, avatar } = useSelector((state) =>
    selectUserById(state, participantId)
  );
  const { selectedParticipants, expandedParticipant } = useSelector(
    (state) => state.participantList
  );
  const { dense } = useSelector((state) => state.applicationTable);
  const labelId = `${
    selectedParticipants.includes(participantId) ? "Des" : "S"
  }elect ${firstName} ${lastName}`;
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip
              arrow
              title={`${
                expandedParticipant === participantId ? "Collapse" : "Expand"
              } participant information`}
            >
              <IconButton
                edge="end"
                color="primary"
                size={dense ? "small" : "medium"}
                aria-expanded={expandedParticipant === participantId}
                aria-label={`${
                  expandedParticipant === participantId ? "Collapse" : "Expand"
                } participant information`}
                onClick={() =>
                  dispatch(
                    expandParticipant(
                      expandedParticipant === participantId ? "" : participantId
                    )
                  )
                }
              >
                <LaunchIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <CustomListIcon
          onClick={() => {
            dispatch(toggleParticipant(participantId));
          }}
        >
          <Checkbox
            size="small"
            edge="start"
            color="primary"
            checked={selectedParticipants.includes(participantId)}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </CustomListIcon>
        <ListItemAvatar>
          <CustomAvatar
            size={dense ? "small" : null}
            alt={`${firstName} ${lastName} profile photo`}
            src={avatar}
          >
            {firstName.substring(0, 2).toUpperCase()}
          </CustomAvatar>
        </ListItemAvatar>
        <ListItemText primary={`${firstName} ${lastName}`} secondary={email} />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default Participant;
