import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { paymentMethods } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setPaymentAmount,
  setPaymentCode,
  setPaymentMethod,
} from "../../features/payment/paymentFormSlice";
import { useCreatePaymentMutation } from "../../features/payment/paymentApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { AttachmentList } from "../../components";

const PaymentForm = ({ applicationId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const dense = useSelector((state) => state.applicationTable.dense);
  const { paymentMethod, paymentCode, paymentAmount, paymentAttachments } =
    useSelector((state) => state.paymentForm);

  const [createPayment, { isSuccess }] = useCreatePaymentMutation();
  const handlePaymentSubmit = async () => {
    await createPayment({
      payee: user.id,
      amount: paymentAmount,
      code: paymentCode,
      method: paymentMethod,
      applicationId,
      attachments: paymentAttachments,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        minWidth: "500px",
      }}
      onSubmit={handlePaymentSubmit}
      component="form"
      direction="column"
    >
      <Stack direction="column" spacing={2} sx={{ margin: 2 }}>
        <Typography color="primary" variant={dense ? "body2" : "body1"}>
          Submit a payment for this application.
        </Typography>
        <TextField
          select
          fullWidth
          autoFocus
          id="select-payment-method"
          label="Payment method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
          variant="outlined"
          size="small"
        >
          {paymentMethods.map((mappedMethod) => (
            <MenuItem key={mappedMethod.value} value={mappedMethod.value}>
              {mappedMethod.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={paymentAmount || ""}
          name="paymentAmount"
          id="payment-amonunt"
          type="number"
          autoComplete="off"
          variant="outlined"
          fullWidth
          label="Amount"
          size="small"
          onChange={(e) => dispatch(setPaymentAmount(e.target.value))}
        />
        <TextField
          value={paymentCode}
          name="paymentCode"
          id="payment-code"
          autoComplete="off"
          variant="outlined"
          fullWidth
          label="Payment Code"
          size="small"
          helperText="The transaction code for this payment."
          onChange={(e) => dispatch(setPaymentCode(e.target.value))}
        />
        <AttachmentList />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Payment Information
        </Button>
      </Stack>
    </Box>
  );
};

export default PaymentForm;
