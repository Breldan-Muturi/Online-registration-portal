import React from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { toggleDelete } from "../../Features/lists/sessionListSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { useDeleteSessionMutation } from "../../Features/api/sessionApiSlice";

const DeleteSession = ({ sessionId }) => {
  const dispatch = useDispatch();
  const { modalDelete } = useSelector((state) => state.sessionList);
  const { isAdmin } = useIsAdmin();
  const [deleteSession, { isSuccess, isLoading, isError }] =
    useDeleteSessionMutation();
  const canDelete = [!isLoading, !isError, isAdmin].every(Boolean);
  const handleDelete = async () => {
    await deleteSession(sessionId);
    isSuccess && dispatch(toggleDelete(""));
  };
  return (
    <>
      <Button
        startIcon={<DeleteForeverIcon />}
        size="small"
        color="error"
        onClick={() => dispatch(toggleDelete(sessionId))}
      >
        Delete
      </Button>
      <Dialog
        open={modalDelete === sessionId}
        onClose={() => dispatch(toggleDelete(""))}
        aria-labelledby="session-deletion-dialog"
        aria-describedby="delete-this-session"
      >
        <DialogTitle id="session-deletion-dialog-title">
          {"Are you sure you want to delete this session?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="session-deletion-dialog-description">
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
            Confirm Delete Session
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSession;
