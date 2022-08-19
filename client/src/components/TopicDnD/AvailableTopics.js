import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Grid, Typography } from "@mui/material";
import useStyles from "./styles";
import Pagination from "@mui/lab/Pagination";
import { TopicCard } from "../index";

const AvailableTopics = ({ availableTopics }) => {
  const classes = useStyles();
  const [availablePage, setAvailablePage] = useState(1);
  return (
    <Droppable droppableId="topicItems">
      {(provided, snapshot) => (
        <Grid
          item
          container
          direction="column"
          classes={{
            root: classes.container,
            container: snapshot.isDraggingOver
              ? classes.availableContainerDragged
              : classes.availableContainer,
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Typography>Available Topics</Typography>
          {availableTopics
            .slice((availablePage - 1) * 4, (availablePage - 1) * 4 + 4)
            .map((mappedTopic, index) => (
              <TopicCard
                key={mappedTopic._id}
                index={index}
                topic={mappedTopic}
              />
            ))}
          {provided.placeholder}
          {Math.ceil(availableTopics?.length / 4) > 1 && (
            <Pagination
              count={Math.ceil(availableTopics?.length / 4)}
              onChange={(_, value) => setAvailablePage(value)}
            />
          )}
        </Grid>
      )}
    </Droppable>
  );
};

export default AvailableTopics;
