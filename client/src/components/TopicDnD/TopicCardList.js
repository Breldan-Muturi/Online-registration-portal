import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTopics,
  useGetTopicsQuery,
} from "../../features/topic/topicApiSlice";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { setSelectedTopicIds } from "../../features/application/customApplicationSlice";
import useStyles from "./styles";
import { AvailableTopics, SelectedTopics } from "..";

const TopicCardList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetTopicsQuery();
  const topics = useSelector(selectAllTopics);
  const { selectedTopicIds } = useSelector((state) => state.customApplication);
  const availableTopics = topics.filter(
    (filteredTopic) => !selectedTopicIds.includes(filteredTopic._id)
  );
  const selectedTopics = topics.filter((filteredTopic) =>
    selectedTopicIds.includes(filteredTopic._id)
  );

  const handleSetTopics = (result) => {
    const { destination, source } = result;
    if (
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      !destination
    ) {
      return;
    }

    let topic;
    let available = availableTopics;
    let selected = selectedTopics;

    //Source Logic
    if (source.droppableId === "topicItems") {
      topic = available[source.index];
      available.splice(source.index, 1);
    } else {
      topic = selected[source.index];
      selected.splice(source.index, 1);
    }

    //Destination Logic
    if (destination.droppableId === "topicItems") {
      available.splice(destination.index, 0, topic);
    } else {
      selected.splice(destination.index, 0, topic);
    }

    dispatch(
      setSelectedTopicIds(selected.map((mappedSelected) => mappedSelected._id))
    );
  };

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="stretch"
      justifyContent="space-between"
    >
      {isError && (
        <Typography color="error" className={classes.message}>
          {`Could not fetch portal topics: <br /> ${error}`}
        </Typography>
      )}
      {isLoading && (
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
        >
          <CircularProgress />
          <Typography className={classes.message}>
            Loading Portal Topics
          </Typography>
        </Grid>
      )}
      {isSuccess && (
        <DragDropContext onDragEnd={handleSetTopics}>
          <AvailableTopics availableTopics={availableTopics} />
          <SelectedTopics selectedTopics={selectedTopics} />
        </DragDropContext>
      )}
    </Grid>
  );
};

export default TopicCardList;
