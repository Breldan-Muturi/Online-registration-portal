import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import useStyles from "./styles";
import clsx from "clsx";
import TopicCard from "../../Components/Cards/TopicCard/TopicCard";
import { Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTopicsPage } from "../../Features/forms/customApplicationSlice";

const SelectedTopics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedTopicIds, selectedTopicsPage } = useSelector(
    (state) => state.customApplication
  );

  return (
    <Droppable droppableId="topicSelected">
      {(provided, snapshot) => (
        <Grid
          xs={5.9}
          className={clsx(
            classes.container,
            snapshot.isDraggingOver
              ? classes.selectedContainerDragged
              : classes.selectedContainer
          )}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Typography>Selected Topics</Typography>
          {selectedTopicIds
            ?.slice(
              (selectedTopicsPage - 1) * 4,
              (selectedTopicsPage - 1) * 4 + 4
            )
            .map((topicId, index) => (
              <TopicCard key={topicId} index={index} topicId={topicId} />
            ))}
          {provided.placeholder}
          {Math.ceil(selectedTopicIds?.length / 4) > 1 && (
            <Pagination
              count={Math.ceil(selectedTopicIds?.length / 4)}
              onChange={(_, value) => dispatch(setSelectedTopicsPage(value))}
            />
          )}
        </Grid>
      )}
    </Droppable>
  );
};

export default SelectedTopics;
