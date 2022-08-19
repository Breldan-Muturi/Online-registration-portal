import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Grid, Typography } from "@mui/material";
import useStyles from "./styles";
import Pagination from "@mui/lab/Pagination";
import { TopicCard } from "../index";

const SelectedTopics = ({ selectedTopics }) => {
  const classes = useStyles();
  const [selectedPage, setSelectedPage] = useState(1);

  return (
    <Droppable droppableId="topicSelected">
      {(provided, snapshot) => (
        <Grid
          item
          container
          direction="column"
          classes={{
            root: classes.container,
            container: snapshot.isDraggingOver
              ? classes.selectedContainerDragged
              : classes.selectedContainer,
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Typography>Selected Topics</Typography>
          {selectedTopics
            ?.slice((selectedPage - 1) * 4, (selectedPage - 1) * 4 + 4)
            .map((mappedTopic, index) => (
              <TopicCard
                key={mappedTopic._id}
                index={index}
                topic={mappedTopic}
              />
            ))}
          {provided.placeholder}
          {Math.ceil(selectedTopics?.length / 4) > 1 && (
            <Pagination
              count={Math.ceil(selectedTopics?.length / 4)}
              onChange={(_, value) => setSelectedPage(value)}
            />
          )}
        </Grid>
      )}
    </Droppable>
  );
};

export default SelectedTopics;