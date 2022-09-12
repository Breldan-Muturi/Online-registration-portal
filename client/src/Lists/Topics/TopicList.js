import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/lab/Pagination";
import CenterList from "../../Custom/CenterList";
import Topic from "../../Components/ListItem/Topic";
import TopicModal from "../../Modals/Topic/TopicModal";
import useStyles from "./styles";
import { useGetTopicsQuery } from "../../Features/api/topicApiSlice";
import { useParams } from "react-router-dom";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { toggleListSelected } from "../../Features/lists/topicListSlice";
import DeleteSelectedTopics from "../../Components/Dialogs/DeleteSelectedTopics";

const TopicList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { isAdmin } = useIsAdmin();
  const { selected } = useSelector((state) => state.topicList);
  const {
    data: topics,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTopicsQuery("topics", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [topicPage, setTopicPage] = useState(1);

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={2} alignItems="center">
        <CircularProgress size={20} />
        <Typography variant="body1">Loading course topics</Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography
        color="error"
        variant="body1"
      >{`Something went wrong loading course topics: ${error?.data?.message}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids, entities } = topics;
    const topicIds = ids.filter(
      (topicId) => entities[topicId].courseId === courseId
    );
    if (!topicIds.length) {
      content = (
        <Typography color="error" variant="body1">
          There are no available topics for this course
        </Typography>
      );
    }
    if (topicIds.length) {
      content = (
        <CenterList
          component="article"
          spacing={3}
          aria-labelledby={`${topicIds.length} Course Topics`}
          subheader={
            <Stack
              direction="column"
              p={2}
              spacing={3}
              justifyContent="space-between"
            >
              <Typography color="primary" variant="h3">
                {`${topicIds.length} Available Topics`}
              </Typography>
              {isAdmin && (
                <Box
                  display="flex"
                  alignContent="center"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        label={`${selected.length ? "Des" : "S"}elect All`}
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < topicIds.length
                        }
                        checked={selected.length === topicIds.length}
                        onChange={() => dispatch(toggleListSelected(topicIds))}
                      />
                    }
                    label={`${selected.length ? "Des" : "S"}elect All`}
                    componentsProps={{ typography: { variant: "button" } }}
                  />
                  <Box display="flex" gap={2}>
                    <DeleteSelectedTopics />
                    <TopicModal courseId={courseId} />
                  </Box>
                </Box>
              )}
            </Stack>
          }
        >
          {topicIds
            .slice((topicPage - 1) * 6, (topicPage - 1) * 6 + 6)
            .map((topicId, index) => (
              <Topic key={index} courseId={courseId} topicId={topicId} />
            ))}
          {Math.ceil(topicIds.length / 6) > 1 && (
            <Pagination
              count={Math.ceil(topicIds.length / 6)}
              onChange={(_, value) => setTopicPage(value)}
            />
          )}
        </CenterList>
      );
    }
  }

  return (
    <Box p={3} className={classes.box}>
      <Grid container direction="column">
        {content}
      </Grid>
    </Box>
  );
};

export default TopicList;
