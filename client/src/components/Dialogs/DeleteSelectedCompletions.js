import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteSelectedCompletionsMutation } from "../../Features/api/completedCoursesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectedCompletionsModal } from "../../Features/lists/completedCourseListSlice";

const DeleteSelectedCompletions = () => {
  const dispatch = useDispatch();
  const { selectedCompletions, modalSelectedCompletions } = useSelector(
    (state) => state.completedCourseList
  );
  const [deleteSelectedCompletions, { isSuccess, isLoading, isError }] =
    useDeleteSelectedCompletionsMutation();
  const canDelete = [!isLoading, !isError].every(Boolean);
  const handleDelete = async () => {
    await deleteSelectedCompletions(selectedCompletions);
    isSuccess && dispatch(toggleSelectedCompletionsModal());
  };

  return (
    <>
      <Button
        disabled={!selectedCompletions.length}
        startIcon={<DeleteForeverIcon />}
        size="small"
        color="error"
        onClick={() => dispatch(toggleSelectedCompletionsModal())}
      >
        Delete
      </Button>
      <Dialog
        open={modalSelectedCompletions}
        onClose={() => dispatch(toggleSelectedCompletionsModal())}
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
            onClick={() => dispatch(toggleSelectedCompletionsModal())}
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
              ? "Deleting completed courses..."
              : "Confirm Delete Completed Courses"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSelectedCompletions;
