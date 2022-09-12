import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../Features/lists/applicationTableSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { toggleModalRejectPayment } from "../../Features/lists/paymentListSlice";
import { useUpdatePaymentMutation } from "../../Features/api/paymentApiSlice";
import DeleteForever from "@mui/icons-material/DeleteForever";

const RejectPayment = ({ paymentId }) => {
  const dispatch = useDispatch();
  const { userId, isAdmin } = useIsAdmin();
  const { dense } = useSelector((state) => state.applicationTable);
  const [updatePayment, { isSuccess, isLoading, isError, error }] =
    useUpdatePaymentMutation();

  const canReject = [!isLoading, !isError, isAdmin].every(Boolean);
  const modalRejectPayment = useSelector(
    (state) => state.paymentList.modalRejectPayment
  );

  const handleRejection = async () => {
    await updatePayment({
      id: paymentId,
      status: "Rejected",
      approvedBy: userId,
    });
    if (isSuccess) {
      dispatch(toggleModalRejectPayment(""));
      dispatch(setSelected(null));
    }
    {
      isError && console.log(error?.data);
    }
  };

  return (
    <>
      <Tooltip arrow title="Reject this payment">
        <IconButton
          edge="end"
          size={dense ? "small" : "medium"}
          color="error"
          aria-labelledby="approve-payment"
          onClick={() =>
            dispatch(
              toggleModalRejectPayment(
                modalRejectPayment === paymentId ? "" : paymentId
              )
            )
          }
        >
          <HighlightOffOutlined />
        </IconButton>
      </Tooltip>
      <Dialog
        open={modalRejectPayment === paymentId}
        onClose={() => dispatch(toggleModalRejectPayment(""))}
        aria-labelledby="reject-payment"
        aria-describedby="reject-applicant's-payment"
      >
        <DialogTitle color="error" id="payment-rejection-dialog-title">
          {"Reject this payment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="payment-rejection-dialog-description">
            Ensure to validate the payment receipt. Rejected Payments will can
            be updated by the user and resubmitted for approval .Once the
            approved payments cover the application fee, the application will be
            marked as complete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => dispatch(toggleModalRejectPayment(""))}
          >
            Dismiss
          </Button>
          <Button
            disabled={!canReject}
            color="error"
            variant="outlined"
            startIcon={<DeleteForever />}
            onClick={handleRejection}
            autoFocus
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RejectPayment;
