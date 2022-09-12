import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteSelectedPaymentsMutation } from "../../Features/api/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalDeleteSelectedPayments } from "../../Features/lists/paymentListSlice";

const DeleteSelectedPayments = () => {
  const dispatch = useDispatch();
  const { selectedPayments, modalDeleteSelectedPayments } = useSelector(
    (state) => state.paymentList
  );
  const [deleteSelectedPayments, { isSuccess, isLoading, isError }] =
    useDeleteSelectedPaymentsMutation();
  const canDelete = [!isLoading, !isError].every(Boolean);
  const handleDelete = async () => {
    await deleteSelectedPayments(selectedPayments);
    isSuccess && dispatch(toggleModalDeleteSelectedPayments());
  };

  return (
    <>
      <Button
        disabled={!selectedPayments.length}
        startIcon={<DeleteForeverIcon />}
        size="small"
        color="error"
        onClick={() => dispatch(toggleModalDeleteSelectedPayments())}
      >
        Delete
      </Button>
      <Dialog
        open={modalDeleteSelectedPayments}
        onClose={() => dispatch(toggleModalDeleteSelectedPayments())}
        aria-labelledby="payments-deletion-dialog"
        aria-describedby="delete-these-payments"
      >
        <DialogTitle color="error" id="payments-deletion-dialog-title">
          {"Are you sure you want to delete the selected payments completions?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="payments-deletion-dialog-description">
            Are you sure you want to delete this payments. Deleting this
            payments will revert your application status to pending.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => dispatch(toggleModalDeleteSelectedPayments())}
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
            {isLoading ? "Deleting payments..." : "Confirm Delete payments"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSelectedPayments;
