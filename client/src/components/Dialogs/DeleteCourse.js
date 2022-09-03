import React, { useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteCourseMutation } from "../../Features/api/courseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../Features/global/authSlice";
import { useNavigate, useParams } from "react-router-dom";

const DeleteCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = useSelector(selectCurrentToken);
  const [deleteCourse, { isSuccess, isLoading, isError }] =
    useDeleteCourseMutation();
  const canDelete = [!isLoading, !isError, token].every(Boolean);
  const handleDelete = async () => {
    await deleteCourse(courseId);
    isSuccess && navigate("/");
  };
  return (
    <>
      <Button
        size="small"
        onClick={() => setOpen(!open)}
        color="error"
        startIcon={<DeleteForeverIcon />}
      >
        Delete this course
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="course-deletion-dialog"
        aria-describedby="delete-this-course"
      >
        <DialogTitle id="course-deletion-dialog-title">
          {"Are you sure you want to delete this course?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="course-deletion-dialog-description">
            Deleting this course will delete all associated sessions, topics and
            applications. Are you sure you want to proceed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setOpen(!open)}>
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
            Confirm Delete Course
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteCourse;
