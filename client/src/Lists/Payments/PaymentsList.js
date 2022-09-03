import React from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { selectApplicationPaymentIds } from "../../Features/api/paymentApiSlice";
import { useSelector } from "react-redux";
import Payment from "../../Components/ListItem/Payment";

const PaymentsList = ({ applicationId }) => {
  const { dense } = useSelector((state) => state.applicationTable);
  const paymentIds = useSelector((state) =>
    selectApplicationPaymentIds(state, applicationId)
  );
  const { selectedPayments } = useSelector((state) => state.paymentList);
  let content;

  if (paymentIds.length) {
    content = (
      <List
        dense={dense}
        aria-labelledby="Submitted Payments"
        subheader={
          <Stack direction="column" justifyContent="space-between">
            <Typography color="primary">Submitted Payments</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                disabled={selectedPayments.length > 0}
                color="inherit"
                size="small"
              >
                {`${selectedPayments.length ? "Des" : "S"}elect All`}
              </Button>
              <div>
                <Button
                  disabled={!selectedPayments.length}
                  color="primary"
                  size="small"
                >
                  Approve
                </Button>
                <Button
                  disabled={!selectedPayments.length}
                  color="error"
                  size="small"
                >
                  Reject
                </Button>
              </div>
            </div>
          </Stack>
        }
        sx={{ backgroundColor: "#fff", minWidth: "350px", padding: "8px" }}
      >
        {paymentIds.map((mappedPaymentId) => (
          <Payment key={mappedPaymentId} paymentId={mappedPaymentId} />
        ))}
      </List>
    );
  }
  return content;
};

export default PaymentsList;
