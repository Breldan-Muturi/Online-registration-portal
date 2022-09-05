import React from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import { selectEveryParticipant } from "../Features/lists/participantListSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectApplicationsById } from "../Features/api/applicationApiSlice";
import Participant from "../Components/ListItem/Participant";

const Participants = ({ applicationId }) => {
  const dispatch = useDispatch();
  const { dense } = useSelector((state) => state.applicationTable);
  const { participants: participantIds } = useSelector((state) =>
    selectApplicationsById(state, applicationId)
  );
  const { selectedParticipants } = useSelector(
    (state) => state.participantList
  );
  console.log(selectedParticipants);
  let content;

  if (participantIds.length) {
    content = (
      <List
        dense={dense}
        aria-labelledby="Application Participants"
        subheader={
          <Stack direction="column" justifyContent="space-between">
            <Typography color="primary">Application Participants</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    label={`${
                      selectedParticipants.length ? "Des" : "S"
                    }elect All`}
                    indeterminate={
                      selectedParticipants.length > 0 &&
                      selectedParticipants.length !== participantIds.length
                    }
                    checked={
                      selectedParticipants.length === participantIds.length
                    }
                    onChange={() => {
                      dispatch(
                        selectEveryParticipant(
                          selectedParticipants.length ? [] : participantIds
                        )
                      );
                    }}
                  />
                }
                label={`${selectedParticipants.length ? "Des" : "S"}elect All`}
                componentsProps={{ typography: { variant: "button" } }}
              />
              <div>
                <Button
                  disabled={!selectedParticipants.length}
                  color="primary"
                  size="small"
                >
                  Approve
                </Button>

                <Button
                  startIcon={<HighlightOffOutlined />}
                  disabled={!selectedParticipants.length}
                  color="error"
                  size="small"
                >
                  Reject
                </Button>
              </div>
            </div>
          </Stack>
        }
        sx={{ backgroundColor: "#fff", minWidth: "350px", padding: "8px" }}
      >
        {participantIds.map((mappedParticipantId) => (
          <Participant
            key={mappedParticipantId}
            participantId={mappedParticipantId}
          />
        ))}
      </List>
    );
  }
  return content;
};

export default Participants;
