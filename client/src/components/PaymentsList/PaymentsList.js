import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import Subheader from "../../Custom/Subheader";
import { useGetPaymentsByApplicationQuery } from "../../features/payment/paymentApiSlice";
import { useSelector } from "react-redux";

const PaymentsList = ({ applicationId }) => {
  const { dense } = useSelector((state) => state.applicationTable);
  const { data: payments, isSuccess } =
    useGetPaymentsByApplicationQuery(applicationId);
  console.log(payments);
  let content;

  if (isSuccess && payments.length) {
    content = (
      <List
        dense={dense}
        aria-labelledby="Submitted Payments"
        subheader={<Subheader size="small">Submitted Payments</Subheader>}
        sx={{ backgroundColor: "#fff", minWidth: "350px", padding: "8px" }}
      >
        {payments.map((mappedPayment) => {
          const amount = mappedPayment.amount
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          return (
            <React.Fragment key={mappedPayment._id}>
              <ListItem>
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
