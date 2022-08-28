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
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  selectApplicationPayments,
  useGetPaymentsByApplicationQuery,
} from "../../features/payment/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApplication,
  togglePayment,
  expandPayment,
} from "../../features/payment/paymentListSlice";
import { Typography } from "@mui/material";
import { ExpandIconCustom } from "../../Custom";
import { SubmittedAttachments } from "..";

const PaymentsList = ({ applicationId }) => {
  const dispatch = useDispatch();
  const { dense } = useSelector((state) => state.applicationTable);
  const payments = useSelector((state) =>
    selectApplicationPayments(state, applicationId)
  );
  const { selectedPayments, expandedPayment } = useSelector(
    (state) => state.paymentList
  );
  let content;

  if (payments.length) {
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
              <ListItem
                secondaryAction={
                  mappedPayment.attachments.length > 0 && (
                    <Tooltip
                      arrow
                      title={
                        expandedPayment === mappedPayment._id
                          ? "Collapse Attachments"
                          : "Expand to inspect attachments"
                      }
                    >
                      <ExpandIconCustom
                        edge="end"
                        color="primary"
                        size={dense ? "small" : "medium"}
                        expanded={expandedPayment === mappedPayment._id}
                        aria-expanded={expandedPayment === mappedPayment._id}
                        aria-label={
                          expandedPayment === mappedPayment._id
                            ? "Hide application attachments"
                            : "View application attachments"
                        }
                        onClick={() =>
                          dispatch(
                            expandPayment(
                              expandedPayment === mappedPayment._id
                                ? ""
                                : mappedPayment._id
                            )
                          )
                        }
                      >
                        <ExpandMoreOutlined />
                      </ExpandIconCustom>
                    </Tooltip>
                  )
                }
              >
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
                  disableTypography
                  primary={`Ksh ${amount} - ${mappedPayment.method}`}
                  secondary={
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mr={2}
                    >
                      <Typography
                        variant="body2"
                        color={
                          (mappedPayment.status === "Rejected" && "error") ||
                          (mappedPayment.status === "Approved" && "primary")
                        }
                      >
                        {mappedPayment.status}
                      </Typography>
                      {mappedPayment.attachments.length > 0 && (
                        <Typography variant="body2">{`${
                          mappedPayment.attachments.length
                        } Attachment${
                          mappedPayment.attachments.length > 1 && "s"
                        }`}</Typography>
                      )}
                    </Stack>
                  }
                />
              </ListItem>
              <SubmittedAttachments payment={mappedPayment} />
              {expandedPayment !== mappedPayment._id && (
                <Divider component="li" />
              )}
            </React.Fragment>
          );
        })}
      </List>
    );
  }
  return content;
};

export default PaymentsList;
