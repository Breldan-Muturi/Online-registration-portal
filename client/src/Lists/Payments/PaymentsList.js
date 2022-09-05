import React from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteSelectedPayments from "../../Components/Dialogs/DeleteSelectedPayments";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import {
  selectApplication,
  selectEveryPayment,
} from "../../Features/lists/paymentListSlice";
import { selectApplicationPaymentIds } from "../../Features/api/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Payment from "../../Components/ListItem/Payment";
import useIsAdmin from "../../Hooks/useIsAdmin";

const PaymentsList = ({ applicationId }) => {
  const dispatch = useDispatch();
  const { isAdmin } = useIsAdmin();
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
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    label={`${selectedPayments.length ? "Des" : "S"}elect All`}
                    indeterminate={
                      selectedPayments.length > 0 &&
                      selectedPayments.length !== paymentIds.length
                    }
                    checked={selectedPayments.length === paymentIds.length}
                    onChange={() => {
                      dispatch(selectApplication(applicationId));
                      dispatch(
                        selectEveryPayment(
                          selectedPayments.length ? [] : paymentIds
                        )
                      );
                    }}
                  />
                }
                label={`${selectedPayments.length ? "Des" : "S"}elect All`}
                componentsProps={{ typography: { variant: "button" } }}
              />
              <div>
                {isAdmin ? (
                  <>
                    <Button
                      disabled={!selectedPayments.length}
                      color="primary"
                      size="small"
                    >
                      Approve
                    </Button>

                    <Button
                      startIcon={<HighlightOffOutlined />}
                      disabled={!selectedPayments.length}
                      color="error"
                      size="small"
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <DeleteSelectedPayments />
                )}
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
