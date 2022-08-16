import {
  Button,
  Modal,
  Backdrop,
  Fade,
  AppBar,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import useStyles from "./styles";
import {
  toggleModal,
  setTitle,
  setDescription,
  reset,
} from "../../features/topic/topicSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useCreateTopicMutation } from "../../features/topic/topicApiSlice";

const TopicModal = ({ courseId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createTopic] = useCreateTopicMutation();
  const { title, description, isOpen } = useSelector((state) => state.topic);

  const onSubmit = async (e) => {
    e.preventDefault();
    const topicData = {
      title,
      description,
      _id: v4(),
      courseId: courseId,
    };
    await createTopic(topicData).unwrap();
    dispatch(reset());
  };

  return (
    <div>
      <Button
        className={classes.submit}
        onClick={() => dispatch(toggleModal())}
        variant="contained"
      >
        Create a new topic
      </Button>
      <Modal
        aria-labelledby="topic-creation-modal"
        aria-describedby="modal-to-create-course-topics"
        open={isOpen}
        className={classes.modal}
        onClose={() => dispatch(toggleModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Typography variant="subtitle1">Create a New Topic</Typography>
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
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    className={classes.submit}
                  >
                    Create New Topic
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TopicModal;
