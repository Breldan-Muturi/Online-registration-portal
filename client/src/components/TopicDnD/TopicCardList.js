import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllTopics,
  useGetTopicsQuery,
} from "../../features/topic/topicApiSlice";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TopicCard } from "..";
import { setSelectedTopicIds } from "../../features/application/customApplicationSlice";
import useStyles from "./styles";

const TopicCardList = ({ selectedTopicIds, courses }) => {
  const { isLoading, isSuccess, isError, error } = useGetTopicsQuery();
  const classes = useStyles();
  console.log(selectedTopicIds);
  const dispatch = useDispatch();
  const topics = useSelector(selectAllTopics);
  const availableTopics = topics.filter(
    (filteredTopic) => !selectedTopicIds.includes(filteredTopic._id)
  );
  const selectedTopics = topics.filter((filteredTopic) =>
    selectedTopicIds.includes(filteredTopic._id)
  );
  console.log(selectedTopics);
  const [availablePage, setAvailablePage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);

  const handleSetTopics = (result) => {
    const { destination, source } = result;
    console.log(result);

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
    console.log(selected);
  };

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="stretch"
      spacing={3}
      justifyContent="space-evenly"
    >
      {isError && (
        <Typography color="error" className={classes.message}>
          Could not fetch portal topics: <br /> {error}
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
          <Droppable droppableId="topicItems">
            {(provided, snapshot) => (
              <Grid
                item
                container
                direction="column"
                classes={{
                  root: classes.droppable,
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
                  .map((mappedTopic, index) => {
                    const course = courses.find(
                      (findCourse) => mappedTopic.courseId === findCourse._id
                    );
                    return (
                      <TopicCard
                        key={mappedTopic._id}
                        index={index}
                        topic={mappedTopic}
                        course={course}
                      />
                    );
                  })}
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
          <Droppable droppableId="topicSelected">
            {(provided, snapshot) => (
              <Grid
                item
                container
                direction="column"
                classes={{
                  root: classes.droppable,
                  container: snapshot.isDraggingOver
                    ? classes.selectedContainerDragged
                    : classes.selectedContainer,
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Typography>Selected Topics</Typography>
                {selectedTopics
                  ?.slice((selectedPage - 1) * 4, (selectedPage - 1) * 4 + 4)
                  .map((mappedTopic, index) => {
                    const course = courses.find(
                      (findCourse) => mappedTopic.courseId === findCourse._id
                    );
                    return (
                      <TopicCard
                        key={mappedTopic._id}
                        index={index}
                        topic={mappedTopic}
                        course={course}
                      />
                    );
                  })}
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
        </DragDropContext>
      )}
    </Grid>
  );
};

export default TopicCardList;
