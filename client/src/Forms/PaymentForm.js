import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import paymentMethods from "../Helpers/PaymentMethods";
import AttachmentList from "../Components/MultiPreview/AttachmentList";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../Features/global/authSlice";
import {
  reset,
  setPaymentAmount,
  setPaymentCode,
  setPaymentMethod,
} from "../Features/forms/paymentFormSlice";
import { useCreatePaymentMutation } from "../Features/api/paymentApiSlice";

const PaymentForm = ({ applicationId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const dense = useSelector((state) => state.applicationTable.dense);
  const { paymentMethod, paymentCode, paymentAmount } = useSelector(
    (state) => state.paymentForm
  );
  const [attachments, setAttachments] = useState([]);
  const [createPayment, { isSuccess }] = useCreatePaymentMutation();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    let payment = new FormData();
    payment.append("payee", user.id);
    payment.append("amount", paymentAmount);
    payment.append("code", paymentCode);
    payment.append("method", paymentMethod);
    payment.append("applicationId", applicationId);
    Object.keys(attachments).forEach((key) => {
      payment.append("attachments", attachments.item(key));
    });
    await createPayment(payment);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      setAttachments([]);
    }
  }, [isSuccess, dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        minWidth: "400px",
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
        <AttachmentList
          attachments={attachments}
          setAttachments={setAttachments}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Payment Information
        </Button>
      </Stack>
    </Box>
  );
};

export default PaymentForm;
