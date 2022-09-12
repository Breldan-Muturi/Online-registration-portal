import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import useStyles from "./styles";
import ExpandIconCustom from "../../../Custom/ExpandIconCustom";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleExpandedTopic,
  addSelectedTopicId,
  removeSelectedTopicId,
} from "../../../Features/forms/customApplicationSlice";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import { useGetTopicsQuery } from "../../../Features/api/topicApiSlice";

const TopicCard = ({ index, topicId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedTopicIds, expandedTopics } = useSelector(
    (state) => state.customApplication
  );
  const {
    topic: { title, description, courseId },
  } = useGetTopicsQuery("topics", {
    selectFromResult: ({ data }) => ({
      topic: data?.entities[topicId],
    }),
  });
  const { courseTitle } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      courseTitle: data?.entities[courseId]?.title ?? "Independent course",
    }),
  });
  const isAdded = selectedTopicIds.includes(topicId);
  const expanded = expandedTopics.includes(topicId);

  return (
    <Draggable key={topicId} draggableId={topicId} index={index}>
      {(provided) => (
        <Card
          key={topicId}
          variant="outlined"
          classes={{ root: classes.card }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardHeader
            classes={{ root: classes.header }}
            title={title}
            titleTypographyProps={{ variant: "h3" }}
            subheader={
              <Typography variant="subtitle2" color="primary">
                {courseTitle}
              </Typography>
            }
            action={
              <Tooltip
                arrow
                title={
                  expanded ? "Collapse topic details" : "Show topic details"
                }
              >
                <ExpandIconCustom
                  color="primary"
                  expanded={expanded}
                  onClick={() => dispatch(toggleExpandedTopic(topicId))}
                  aria-expanded={expanded}
                  aria-label="view-topic-details"
                >
                  <ExpandMoreOutlined />
                </ExpandIconCustom>
              </Tooltip>
            }
          />
          <Collapse
            in={expandedTopics.includes(topicId)}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
          </Collapse>
          <CardActions classes={{ root: classes.actions }}>
            <Button
              size="small"
              color={isAdded ? "error" : "primary"}
              startIcon={
                isAdded ? <HighlightOffOutlined /> : <AddCircleOutline />
              }
              onClick={() =>
                dispatch(
                  isAdded
                    ? removeSelectedTopicId(topicId)
                    : addSelectedTopicId(topicId)
                )
              }
            >
              {isAdded ? "Remove Topic" : "Add Topic"}
            </Button>
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};

export default TopicCard;
