import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteSelectedTopicsMutation } from "../../Features/api/topicApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { toggleDeleteSelected } from "../../Features/lists/topicListSlice";

const DeleteSelectedTopics = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useIsAdmin();
  const { selected, modalDeleteSelected } = useSelector(
    (state) => state.topicList
  );
  const [deleteSelectedTopics, { isSuccess, isLoading, isError }] =
    useDeleteSelectedTopicsMutation();
  const canDelete = [!isLoading, !isError, isAdmin].every(Boolean);
  const handleDelete = async () => {
    await deleteSelectedTopics(selected);
    isSuccess && dispatch(toggleDeleteSelected());
  };

  return (
    <>
      <Button
        disabled={!selected.length}
        startIcon={<DeleteForeverIcon />}
        size="small"
        color="error"
        onClick={() => dispatch(toggleDeleteSelected())}
      >
        Delete
      </Button>
      <Dialog
        open={modalDeleteSelected}
        onClose={() => dispatch(toggleDeleteSelected())}
        aria-labelledby="course-deletion-dialog"
        aria-describedby="delete-this-course"
      >
        <DialogTitle id="course-deletion-dialog-title">
          {"Are you sure you want to delete the selected course completions?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="course-deletion-dialog-description">
            Are you sure you want to delete the selected course completions. You
            will have to reapply for approval. You will not be able to complete
            applications that require these courses as a prerequisite.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => dispatch(toggleDeleteSelected())}
          >
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
            {isLoading
              ? "Deleting selected topics..."
              : "Confirm Delete Topics"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSelectedTopics;
