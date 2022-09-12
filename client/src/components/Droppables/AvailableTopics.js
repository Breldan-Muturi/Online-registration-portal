import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import TopicCard from "../../Components/Cards/TopicCard/TopicCard";
import clsx from "clsx";
import useStyles from "./styles";
import { Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { setAvailableTopicsPage } from "../../Features/forms/customApplicationSlice";
import { useGetTopicsQuery } from "../../Features/api/topicApiSlice";

const AvailableTopics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedTopicIds, availableTopicsPage } = useSelector(
    (state) => state.customApplication
  );
  const { availableTopicIds } = useGetTopicsQuery("topics", {
    selectFromResult: ({ data }) => ({
      availableTopicIds: data?.ids.filter(
        (topicId) => !selectedTopicIds.includes(topicId)
      ),
    }),
  });
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
          {availableTopicIds
            .slice(
              (availableTopicsPage - 1) * 4,
              (availableTopicsPage - 1) * 4 + 4
            )
            .map((topicId, index) => (
              <TopicCard key={topicId} index={index} topicId={topicId} />
            ))}
          {provided.placeholder}
          {Math.ceil(availableTopicIds?.length / 4) > 1 && (
            <Pagination
              count={Math.ceil(availableTopicIds?.length / 4)}
              onChange={(_, value) => dispatch(setAvailableTopicsPage(value))}
            />
          )}
        </Grid>
      )}
    </Droppable>
  );
};

export default AvailableTopics;
