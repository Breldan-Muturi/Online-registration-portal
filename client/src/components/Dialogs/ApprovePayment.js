import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../Features/lists/applicationTableSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { toggleModalApprovePayment } from "../../Features/lists/paymentListSlice";
import { useUpdatePaymentMutation } from "../../Features/api/paymentApiSlice";

const ApprovePayment = ({ paymentId }) => {
  const dispatch = useDispatch();
  const { userId, isAdmin } = useIsAdmin();
  const { dense } = useSelector((state) => state.applicationTable);
  const [updatePayment, { isSuccess, isLoading, isError, error }] =
    useUpdatePaymentMutation();

  const canApprove = [!isLoading, !isError, isAdmin].every(Boolean);
  const modalApprovePayment = useSelector(
    (state) => state.paymentList.modalApprovePayment
  );
  const handleApproval = async () => {
    await updatePayment({
      id: paymentId,
      status: "Approved",
      approvedBy: userId,
    });
    if (isSuccess) {
      dispatch(toggleModalApprovePayment(""));
      dispatch(setSelected(null));
    }
    {
      isError && console.log(error?.data);
    }
  };

  return (
    <>
      <Tooltip arrow title="Approve this payment">
        <IconButton
          edge="end"
          size={dense ? "small" : "medium"}
          color="primary"
          aria-labelledby="approve-payment"
          onClick={() =>
            dispatch(
              toggleModalApprovePayment(
                modalApprovePayment === paymentId ? "" : paymentId
              )
            )
          }
        >
          <CheckCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={modalApprovePayment === paymentId}
        onClose={() => dispatch(toggleModalApprovePayment(""))}
        aria-labelledby="approve-payment"
        aria-describedby="approve-applicant's-payment"
      >
        <DialogTitle color="primary" id="payment-approval-dialog-title">
          {"Approve this payment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="payment-approval-dialog-description">
            Ensure to validate the payment receipt. Once the approved payments
            cover the application fee, the application will be marked as
            complete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => dispatch(toggleModalApprovePayment(""))}
          >
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

export default ApprovePayment;
