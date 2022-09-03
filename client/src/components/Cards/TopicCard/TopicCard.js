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
  addSelectedTopicId,
  removeSelectedTopicId,
} from "../../../Features/forms/customApplicationSlice";
import { selectCourseById } from "../../../Features/api/courseApiSlice";

const TopicCard = ({ index, topic }) => {
  const classes = useStyles();
  const course = useSelector((state) =>
    selectCourseById(state, topic.courseId)
  );
  const dispatch = useDispatch();
  const { selectedTopicIds } = useSelector((state) => state.customApplication);
  const isAdded = selectedTopicIds.includes(topic._id);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Draggable key={topic._id} draggableId={topic._id} index={index}>
      {(provided) => (
        <Card
          key={topic._id}
          variant="outlined"
          classes={{ root: classes.card }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardHeader
            classes={{ root: classes.header }}
            title={topic.title}
            titleTypographyProps={{ variant: "h3" }}
            subheader={
              <Typography variant="subtitle2" color="primary">
                {`Course: ${course?.title || "Independent course"}`}
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
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="view-topic-details"
                >
                  <ExpandMoreOutlined />
                </ExpandIconCustom>
              </Tooltip>
            }
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>{topic.description}</Typography>
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
                    ? removeSelectedTopicId(topic._id)
                    : addSelectedTopicId(topic._id)
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
