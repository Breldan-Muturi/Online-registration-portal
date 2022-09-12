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
import { useDispatch, useSelector } from "react-redux";
import { toggleModalDeletePayment } from "../../Features/lists/paymentListSlice";
import { setSelected } from "../../Features/lists/applicationTableSlice";
import { useDeletePaymentMutation } from "../../Features/api/paymentApiSlice";

const DeletePayment = ({ paymentId }) => {
  const dispatch = useDispatch();
  const modalDeletePayment = useSelector(
    (state) => state.paymentList.modalDeletePayment
  );
  const [deletePayment, { isSuccess, isLoading, isError }] =
    useDeletePaymentMutation();
  const canDelete = [!isLoading, !isError].every(Boolean);
  const handleDelete = async () => {
    await deletePayment(paymentId);
    isSuccess && dispatch(setSelected(""));
  };

  return (
    <>
      <Tooltip arrow title="Delete this payment">
        <IconButton
          edge="end"
          color="error"
          aria-labelledby="delete-payment"
          onClick={() =>
            dispatch(
              toggleModalDeletePayment(
                modalDeletePayment === paymentId ? "" : paymentId
              )
            )
          }
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={modalDeletePayment === paymentId}
        onClose={() => dispatch(toggleModalDeletePayment(""))}
        aria-labelledby="payment-deletion-dialog"
        aria-describedby="delete-this-payment"
      >
        <DialogTitle color="error" id="payment-deletion-dialog-title">
          {"Are you sure you want to delete this payment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="payment-deletion-dialog-description">
            Are you sure you want to delete this payment. Deleting this payment
            will revert your application status to pending.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => dispatch(toggleModalDeletePayment(""))}
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
            {isLoading ? "Deleting payment..." : "Confirm Delete Payment"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePayment;
