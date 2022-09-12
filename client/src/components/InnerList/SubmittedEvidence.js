import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import UploadPreview from "../../Custom/UploadPreview";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import {
  selectCompletedCourseById,
  useGetCompletedCoursesQuery,
} from "../../Features/api/completedCoursesApiSlice";

const SubmittedEvidence = ({ completedCourseId }) => {
  const expandedCompletion = useSelector(
    (state) => state.completedCourseList.expandedCompletion
  );
  const [page, setPage] = useState(1);
  const { evidence } = useGetCompletedCoursesQuery("completedCourses", {
    selectFromResult: ({ data }) => ({
      evidence: data?.entities[completedCourseId].evidence,
    }),
  });
  const count = Math.ceil(evidence.length / 3);
  return (
    <Collapse
      in={expandedCompletion === completedCourseId}
      timeout="auto"
      unmountOnExit
    >
      <List dense>
        {evidence
          .slice((page - 1) * 3, (page - 1) * 3 + 3)
          .map((evidence, index) => {
            const { name, size, path: url } = evidence;
            return (
              <React.Fragment key={index}>
                <ListItem
                  secondaryAction={
                    <Tooltip arrow title="View the attachment">
                      <IconButton
                        component="a"
                        target="_blank"
                        href={`http://localhost:8000/${url}`}
                        edge="end"
                        color="primary"
                        size="small"
                      >
                        <LaunchIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <UploadPreview
                    size="small"
                    src={url}
                    alt={`File name ${name}`}
                  >
                    {<UploadFileIcon />}
                  </UploadPreview>
                  <ListItemText
                    primary={`${name.substring(0, 15)}${
                      name.length > 15 && "..."
                    }`}
                    secondary={size}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
              </React.Fragment>
            );
          })}

        {count > 1 && (
          <Pagination count={count} onChange={(_, value) => setPage(value)} />
        )}
      </List>
    </Collapse>
  );
};

export default SubmittedEvidence;
