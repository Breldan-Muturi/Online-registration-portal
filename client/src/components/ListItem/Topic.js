import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import ExpandIconCustom from "../../Custom/ExpandIconCustom";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import useIsAdmin from "../../Hooks/useIsAdmin";
import {
  toggleExpanded,
  toggleSelected,
} from "../../Features/lists/topicListSlice";
import DeleteTopic from "../Dialogs/DeleteTopic";
import { useGetTopicsQuery } from "../../Features/api/topicApiSlice";
import { useDispatch, useSelector } from "react-redux";
import EditTopic from "../../Modals/Topic/EditTopic";

const Topic = ({ topicId, courseId }) => {
  const dispatch = useDispatch();
  const { isAdmin } = useIsAdmin();
  const { expanded, selected } = useSelector((state) => state.topicList);
  const {
    topic: { title, description },
    index,
    notLast,
  } = useGetTopicsQuery("topics", {
    selectFromResult: ({ data }) => ({
      topic: data?.entities[topicId],
      index:
        data?.ids
          .filter((topicId) => data?.entities[topicId].courseId === courseId)
          .indexOf(topicId) + 1,
      notLast:
        data?.ids.filter(
          (topicId) => data?.entities[topicId].courseId === courseId
        ).length >
        data?.ids
          .filter((topicId) => data?.entities[topicId].courseId === courseId)
          .indexOf(topicId) +
          1,
    }),
  });

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip
              arrow
              title={`${
                expanded === topicId ? "Collapse" : "View"
              } topic description`}
            >
              <ExpandIconCustom
                color="primary"
                edge="end"
                size="small"
                expanded={expanded === topicId}
                aria-expanded={expanded === topicId}
                aria-label={
                  expanded === topicId
                    ? "Hide topic description"
                    : "Show topic description"
                }
                onClick={() => dispatch(toggleExpanded(topicId))}
              >
                <ExpandMoreOutlined />
              </ExpandIconCustom>
            </Tooltip>
            {isAdmin && (
              <>
                <EditTopic topicId={topicId} />
                <DeleteTopic topicId={topicId} courseId={courseId} />
              </>
            )}
          </>
        }
      >
        {isAdmin && (
          <ListItemIcon>
            <Checkbox
              size="small"
              color="primary"
              checked={selected.includes(topicId)}
              onChange={() => dispatch(toggleSelected(topicId))}
            />
          </ListItemIcon>
        )}
        <ListItemText
          primary={`${index}. ${title}`}
          secondary={expanded === topicId ? description : null}
        />
      </ListItem>
      {notLast && <Divider component="li" variant="middle" />}
    </>
  );
};

export default Topic;
