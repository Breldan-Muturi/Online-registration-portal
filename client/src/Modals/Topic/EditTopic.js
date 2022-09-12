import React, { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import UpdateIcon from "@mui/icons-material/Update";
import useStyles from "./styles";
import { setTitle, setDescription } from "../../Features/forms/topicSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetTopicsQuery,
  useUpdateTopicMutation,
} from "../../Features/api/topicApiSlice";
import { toggleEdit } from "../../Features/lists/topicListSlice";
import LoadingButton from "@mui/lab/LoadingButton";

const EditTopic = ({ topicId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { title, description } = useGetTopicsQuery("topics", {
    selectFromResult: ({ data }) => ({
      title: data?.entities[topicId].title,
      description: data?.entities[topicId].description,
    }),
  });

  const [updateTopic, { isLoading, isSuccess, isError, error }] =
    useUpdateTopicMutation();
  const { title: formTitle, description: formDescription } = useSelector(
    (state) => state.topic
  );
  const { modalEdit } = useSelector((state) => state.topicList);

  useEffect(() => {
    dispatch(setTitle(title));
    dispatch(setDescription(description));
  }, [dispatch, title, description]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const topicData = {
      title: formTitle,
      description: formDescription,
    };
    await updateTopic({ topicData, topicId }).unwrap();
    isSuccess && dispatch(toggleEdit(""));
  };

  return (
    <>
      <Tooltip arrow title={"Update this topic"}>
        <IconButton
          color="primary"
          edge="end"
          size="small"
          aria-label="edit topic"
          onClick={() => dispatch(toggleEdit(topicId))}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="topic-update-modal"
        aria-describedby="modal-to-update-course-topics"
        open={modalEdit === topicId}
        className={classes.modal}
        onClose={() => dispatch(toggleEdit(""))}
        closeAfterTransition
      >
        <Fade in={modalEdit === topicId}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Typography variant="subtitle1">{`Update ${title.substring(
                0,
                25
              )}${title.length > 25 ? "..." : "."}`}</Typography>
            </AppBar>
            <form onSubmit={onSubmit} className={classes.div}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={title}
                    name="title"
                    id="title"
                    autoComplete="off"
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                    label="Topic title"
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={description}
                    name="description"
                    id="description"
                    autoComplete="off"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    minRows={4}
                    label="Topic description"
                    onChange={(e) => dispatch(setDescription(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    startIcon={<UpdateIcon />}
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className={classes.submit}
                  >
                    {isLoading ? "Updating this topic..." : "Update this Topic"}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default EditTopic;
