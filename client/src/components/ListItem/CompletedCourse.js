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
import { useGetCompletedCoursesQuery } from "../../Features/api/completedCoursesApiSlice";
import {
  expandCompletion,
  toggleCompletion,
} from "../../Features/lists/completedCourseListSlice";
import { useGetCoursesQuery } from "../../Features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteCompletion from "../Dialogs/DeleteCompletion";

const CompletedCourse = ({ completedCourseId, index, completionCount }) => {
  const dispatch = useDispatch();
  const { selectedCompletions, expandedCompletion } = useSelector(
    (state) => state.completedCourseList
  );

  const {
    completedCourse: { courseId, status },
    evidenceCount,
  } = useGetCompletedCoursesQuery("completedCourses", {
    selectFromResult: ({ data }) => ({
      completedCourse: data?.entities[completedCourseId],
      evidenceCount: data?.entities[completedCourseId].evidence.length,
    }),
  });

  const { title } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      title: data?.entities[courseId].title,
    }),
  });

  const labelId = `${
    selectedCompletions.includes(completedCourseId) ? "Deselect" : "Select"
  } this course completion`;

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <DeleteCompletion completedCourseId={completedCourseId} />
            {evidenceCount > 0 && (
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
                  onClick={() => dispatch(expandCompletion(completedCourseId))}
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
          primary={<Typography>{title}</Typography>}
          secondary={
            <Stack direction="row" gap={5}>
              <Typography
                variant="body2"
                color={
                  (status === "Approved" && "primary") ||
                  (status === "Rejected" && "error")
                }
              >
                {status}
              </Typography>
              {evidenceCount > 0 && (
                <Typography variant="body2">{`${evidenceCount} Documents Attached`}</Typography>
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
