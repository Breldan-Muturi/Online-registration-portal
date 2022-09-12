import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteTopicMutation } from "../../Features/api/topicApiSlice";
import { toggleDelete } from "../../Features/lists/topicListSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";

const DeleteTopic = ({ topicId }) => {
  const dispatch = useDispatch();
  const { modalDelete } = useSelector((state) => state.topicList);
  const { isAdmin } = useIsAdmin();
  const [deleteTopic, { isSuccess, isLoading, isError }] =
    useDeleteTopicMutation();
  const canDelete = [!isLoading, !isError, isAdmin].every(Boolean);
  const handleDelete = async () => {
    await deleteTopic(topicId);
    isSuccess && dispatch(toggleDelete(""));
  };
  return (
    <>
      <Tooltip arrow title="Delete this topic">
        <IconButton
          edge="end"
          size="small"
          color="error"
          aria-labelledby="delete-topic"
          onClick={() => dispatch(toggleDelete(topicId))}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={modalDelete === topicId}
        onClose={() => dispatch(toggleDelete(""))}
        aria-labelledby="topic-deletion-dialog"
        aria-describedby="delete-this-topic"
      >
        <DialogTitle id="topic-deletion-dialog-title">
          {"Are you sure you want to delete this topic?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="topic-deletion-dialog-description">
            Deleting this topic will delete reset any custom applications that
            have this topic selected. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => dispatch(toggleDelete(""))}>
            Dismiss
          </Button>
          <LoadingButton
            loading={isLoading}
            disabled={!canDelete}
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={handleDelete}
            autoFocus
          >
            Confirm Delete Topic
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTopic;
