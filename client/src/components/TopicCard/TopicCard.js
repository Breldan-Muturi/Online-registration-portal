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
} from "@material-ui/core";
import {
  AddCircleOutline,
  ExpandMoreOutlined,
  HighlightOffOutlined,
} from "@material-ui/icons";
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
      {(provided, snapshot) => (
        <Card
          key={topic._id}
          component="div"
          variant="outlined"
          classes={{ root: classes.card }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
            {!isAdded ? (
              <Button
                size="small"
                color="primary"
                startIcon={<AddCircleOutline />}
                onClick={() => dispatch(addSelectedTopicId(topic._id))}
              >
                Add Topic
              </Button>
            ) : (
              <Button
                size="small"
                color="secondary"
                startIcon={<HighlightOffOutlined />}
                onClick={() => dispatch(removeSelectedTopicId(topic._id))}
              >
                Remove Topic
              </Button>
            )}
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};

export default TopicCard;
