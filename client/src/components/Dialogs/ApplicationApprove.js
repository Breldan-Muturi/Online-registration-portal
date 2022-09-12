import React, { useState } from "react";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUpdateApplicationMutation } from "../../Features/api/applicationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../Features/lists/applicationTableSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";

const ApplicationApprove = ({ applicationId }) => {
  const dispatch = useDispatch();
  const { userId, isAdmin } = useIsAdmin();
  const { dense } = useSelector((state) => state.applicationTable);
  const [updateApplication, { isSuccess, isLoading, isError, error }] =
    useUpdateApplicationMutation();

  const canApprove = [!isLoading, !isError, isAdmin].every(Boolean);
  const [open, setOpen] = useState(false);
  const handleDialog = () => {
    setOpen(!open);
  };
  const handleApproval = async () => {
    await updateApplication({
      id: applicationId,
      status: "Approved",
      approvedBy: userId,
    });
    {
      isSuccess && setOpen(!open);
      dispatch(setSelected(null));
    }
    {
      isError && console.log(error?.data);
    }
  };

  return (
    <>
      <Button
        color="primary"
        size={dense ? "small" : "medium"}
        startIcon={<CheckCircleOutlineIcon />}
        onClick={handleDialog}
      >
        Approve
      </Button>
      <Dialog
        open={open}
        onClose={handleDialog}
        aria-labelledby="approva-application-for-payment-dialog"
        aria-describedby="allow-the-application-creator-to-submit-payments"
      >
        <DialogTitle id="application-approval-dialog-title">
          {"Approve this application for payment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="application-approval-dialog-description">
            Allow the application creator to submit payments. Ensure to confirm
            prerequisite courses and check the slots and availability.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDialog}>
            Dismiss
          </Button>
          <Button
            disabled={!canApprove}
            color="primary"
            variant="outlined"
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleApproval}
            autoFocus
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicationApprove;
