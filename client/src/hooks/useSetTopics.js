import { selectAllCourses } from "../features/course/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetTopicsQuery,
  selectAllTopics,
} from "../features/topic/topicApiSlice";
import { setSelectedTopicIds } from "../features/application/customApplicationSlice";

const useSetTopics = (result) => {
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

  return dispatch(
    setSelectedTopicIds(selected.map((mappedSelected) => mappedSelected._id))
  );
};

export default useSetTopics;
