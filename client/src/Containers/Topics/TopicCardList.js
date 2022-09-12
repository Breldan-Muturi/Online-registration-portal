import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import AvailableTopics from "../../Components/Droppables/AvailableTopics";
import SelectedTopics from "../../Components/Droppables/SelectedTopics";
import { DragDropContext } from "@hello-pangea/dnd";
import { setSelectedTopicIds } from "../../Features/forms/customApplicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopicsQuery } from "../../Features/api/topicApiSlice";

const TopicCardList = () => {
  const dispatch = useDispatch();
  const { selectedTopicIds } = useSelector((state) => state.customApplication);
  const {
    data: topics,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTopicsQuery("topics", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={1} p={2} alignItems="center">
        <CircularProgress size="small" />
        <Typography variant="body1">Loading available topics ...</Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Stack p={2}>
        <Typography
          variant="body1"
          color="error"
        >{`Something went wrong loading portal topics: ${error?.data?.message}`}</Typography>
      </Stack>
    );
  }

  if (isSuccess) {
    const { ids } = topics;
    const availableTopicIds = ids.filter(
      (topicId) => !selectedTopicIds.includes(topicId)
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
      let available = availableTopicIds;
      let selected = [...selectedTopicIds];

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

      dispatch(setSelectedTopicIds(selected));
    };

    content = (
      <DragDropContext onDragEnd={handleSetTopics}>
        <AvailableTopics />
        <SelectedTopics />
      </DragDropContext>
    );
  }

  return (
    <Grid
      container
      xs={12}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      m={3}
    >
      {content}
    </Grid>
  );
};

export default TopicCardList;
