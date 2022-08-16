import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddCircleOutline,
  ExpandMoreOutlined,
  HighlightOffOutlined,
} from "@mui/icons-material";
import useStyles from "./styles";
import clsx from "clsx";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedTopicId,
  removeSelectedTopicId,
} from "../../features/application/customApplicationSlice";

const TopicCard = ({ index, topic, course }) => {
  const classes = useStyles();
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
                Course: {course.title}
              </Typography>
            }
            action={
              <Tooltip
                arrow
                title={
                  expanded ? "Collapse topic details" : "Show topic details"
                }
              >
                <IconButton
                  color="primary"
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="view-topic-details"
                >
                  <ExpandMoreOutlined />
                </IconButton>
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
              color={isAdded ? "secondary" : "primary"}
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
