import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/lab/Pagination";
import TopicCard from "../../Components/Cards/TopicCard/TopicCard";
import clsx from "clsx";
import useStyles from "./styles";
import { Droppable } from "@hello-pangea/dnd";

const AvailableTopics = ({ availableTopics }) => {
  const classes = useStyles();
  const [availablePage, setAvailablePage] = useState(1);
  return (
    <Droppable droppableId="topicItems">
      {(provided, snapshot) => (
        <Grid
          xs={5.9}
          className={clsx(
            classes.container,
            snapshot.isDraggingOver
              ? classes.availableContainerDragged
              : classes.availableContainer
          )}
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
