import React from "react";
import Button from "@mui/material/Button";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUpdateSelectedPaymentsMutation } from "../../Features/api/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalApproveSelectedPayments } from "../../Features/lists/paymentListSlice";

const ApproveSelectedPayments = () => {
  const dispatch = useDispatch();
  const { selectedPayments, modalApproveSelectedPayments } = useSelector(
    (state) => state.paymentList
  );
  const [updateSelectedPayments, { isSuccess, isLoading, isError }] =
    useUpdateSelectedPaymentsMutation();
  const canDelete = [!isLoading, !isError].every(Boolean);
  const handleDelete = async () => {
    await updateSelectedPayments(selectedPayments);
    isSuccess && dispatch(toggleModalApproveSelectedPayments());
  };

  return (
    <>
      <Button
        disabled={!selectedPayments.length}
        startIcon={<HighlightOffOutlined />}
        size="small"
        color="error"
        onClick={() => dispatch(toggleModalApproveSelectedPayments())}
      >
        Delete
      </Button>
      <Dialog
        open={modalApproveSelectedPayments}
        onClose={() => dispatch(toggleModalApproveSelectedPayments())}
        aria-labelledby="payments-rejection-dialog"
        aria-describedby="reject-these-payments"
      >
        <DialogTitle color="error" id="payments-rejection-dialog-title">
          {"Reject the selected payments completions?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="payments-rejection-dialog-description">
            Are you sure you want to reject this payments. Rejecting these
            payments will revert your application status to pending. However,
            the applicant may edit these payments and resubmit for your review.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isLoading}
            disabled={!canDelete}
            color="error"
            startIcon={<HighlightOffOutlined />}
            onClick={handleDelete}
            autoFocus
          >
            {isLoading ? "Rejecting payments..." : "Confirm Reject payments"}
          </LoadingButton>
          <Button
            color="inherit"
            onClick={() => dispatch(toggleModalApproveSelectedPayments())}
          >
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApproveSelectedPayments;
