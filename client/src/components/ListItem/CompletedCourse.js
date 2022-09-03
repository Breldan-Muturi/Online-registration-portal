import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ExpandIconCustom from "../../Custom/ExpandIconCustom";
import SubmittedEvidence from "../InnerList/SubmittedEvidence";
import { selectCompletedCourseById } from "../../Features/api/completedCoursesApiSlice";
import {
  expandCompletion,
  toggleCompletion,
} from "../../Features/lists/completedCourseListSlice";
import { useGetCourseByIdQuery } from "../../Features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteCompletion from "../Dialogs/DeleteCompletion";

const CompletedCourse = ({ completedCourseId, index, completionCount }) => {
  const dispatch = useDispatch();
  const completedCourse = useSelector((state) =>
    selectCompletedCourseById(state, completedCourseId)
  );
  const { selectedCompletions, expandedCompletion } = useSelector(
    (state) => state.completedCourseList
  );

  const {
    data: foundCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCourseByIdQuery(completedCourse?.courseId);

  const course =
    (isSuccess && foundCourse.title) ||
    (isLoading && "Loading related course") ||
    (isError && `There is no related course: ${error?.data?.message}`);

  const labelId = `${
    selectedCompletions.includes(completedCourseId) ? "Deselect" : "Select"
  } this course completion`;

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <DeleteCompletion completedCourseId={completedCourseId} />
            {completedCourse.evidence.length > 0 && (
              <Tooltip arrow title="Expand to inspect evidence attachments">
                <ExpandIconCustom
                  edge="end"
                  color="primary"
                  size="small"
                  expanded={expandedCompletion === completedCourseId}
                  aria-expanded={expandedCompletion === completedCourseId}
                  aria-label={
                    expandedCompletion === completedCourseId
                      ? "Show completion evidence"
                      : "Hide completion evidence"
                  }
                  onClick={() =>
                    dispatch(
                      expandCompletion(
                        expandedCompletion === completedCourseId
                          ? ""
                          : completedCourseId
                      )
                    )
                  }
                >
                  <ExpandMoreOutlined />
                </ExpandIconCustom>
              </Tooltip>
            )}
          </>
        }
      >
        <ListItemIcon>
          <Checkbox
            size="small"
            checked={selectedCompletions.includes(completedCourseId)}
            onChange={() => dispatch(toggleCompletion(completedCourseId))}
            edge="start"
            color="primary"
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          primary={<Typography>{course}</Typography>}
          secondary={
            <Stack direction="row" gap={5}>
              <Typography
                variant="body2"
                color={
                  (completedCourse.status === "Approved" && "primary") ||
                  (completedCourse.status === "Rejected" && "error")
                }
              >
                {completedCourse.status}
              </Typography>
              {completedCourse.evidence.length > 0 && (
                <Typography variant="body2">{`${completedCourse.evidence.length} Documents Attached`}</Typography>
              )}
            </Stack>
          }
          disableTypography
        />
      </ListItem>
      <SubmittedEvidence completedCourseId={completedCourseId} />
      {expandedCompletion !== completedCourseId &&
        index + 1 !== completionCount && (
          <Divider variant="middle" component="li" />
        )}
    </>
  );
};

export default CompletedCourse;
