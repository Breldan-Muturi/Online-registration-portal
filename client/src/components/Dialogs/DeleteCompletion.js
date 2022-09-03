import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteCompletedCourseMutation } from "../../Features/api/completedCoursesApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openCompletionModal } from "../../Features/lists/completedCourseListSlice";

const DeleteCompletion = ({ completedCourseId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalCompletion = useSelector(
    (state) => state.completedCourseList.modalCompletion
  );
  const [deleteCompletedCourse, { isSuccess, isLoading, isError }] =
    useDeleteCompletedCourseMutation();
  const canDelete = [!isLoading, !isError].every(Boolean);
  const handleDelete = async () => {
    await deleteCompletedCourse(completedCourseId);
    isSuccess && navigate("/");
  };

  return (
    <>
      <Tooltip arrow title="Delete this course completion">
        <IconButton
          edge="end"
          color="error"
          aria-labelledby="delete-course-completion"
          onClick={() =>
            dispatch(
              openCompletionModal(
                modalCompletion === completedCourseId ? "" : completedCourseId
              )
            )
          }
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={modalCompletion === completedCourseId}
        onClose={() => dispatch(openCompletionModal(""))}
        aria-labelledby="course-deletion-dialog"
        aria-describedby="delete-this-course"
      >
        <DialogTitle id="course-deletion-dialog-title">
          {"Are you sure you want to delete this course completion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="course-deletion-dialog-description">
            Are you sure you want to delete this course completion. You will
            have to reapply for approval. You will not be able to complete
            applications that require this course as a prerequisite.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => dispatch(openCompletionModal(""))}
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
              ? "Deleting completed course..."
              : "Confirm Delete Course"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteCompletion;
