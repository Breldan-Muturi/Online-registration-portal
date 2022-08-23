import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import Subheader from "../../Custom/Subheader";
import { useGetPaymentsByApplicationQuery } from "../../features/payment/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApplication,
  togglePayment,
  expandPayment,
} from "../../features/payment/paymentListSlice";
import { Typography } from "@mui/material";

const PaymentsList = ({ applicationId }) => {
  const dispatch = useDispatch();
  const { dense } = useSelector((state) => state.applicationTable);
  const { data: payments, isSuccess } =
    useGetPaymentsByApplicationQuery(applicationId);
  const { selectedApplication, selectedPayments, expandedPayment } =
    useSelector((state) => state.paymentList);
  let content;

  if (isSuccess && payments.length) {
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
                disabled={selectedPayments.length}
                color="inherit"
                size="small"
              >
                Select All
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
        {payments.map((mappedPayment) => {
          const amount = mappedPayment.amount
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          const labelId = `${
            selectedPayments.includes(mappedPayment._id) ? "Deselect" : "Select"
          } payment of Ksh ${amount}`;
          return (
            <React.Fragment key={mappedPayment._id}>
              <ListItem>
                <ListItemIcon
                  onClick={() => {
                    dispatch(togglePayment(mappedPayment._id));
                    dispatch(selectApplication(applicationId));
                  }}
                >
                  <Checkbox
                    edge="start"
                    color="primary"
                    checked={selectedPayments.includes(mappedPayment._id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`Ksh ${amount} - ${mappedPayment.method}`}
                  secondary={mappedPayment.status}
                  secondaryTypographyProps={{
                    color:
                      (mappedPayment.status === "Approved" && "primary") ||
                      (mappedPayment.status === "Rejected" && "error"),
                  }}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          );
        })}
      </List>
    );
  }
  return content;
};

export default PaymentsList;
