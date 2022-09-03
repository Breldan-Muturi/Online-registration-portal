import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandIconCustom from "../../Custom/ExpandIconCustom";
import SubmittedAttachments from "../../Components/InnerList/SubmittedAttachments";
import { selectPaymentById } from "../../Features/api/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApplication,
  togglePayment,
  expandPayment,
} from "../../Features/lists/paymentListSlice";

const Payment = ({ paymentId }) => {
  const dispatch = useDispatch();
  const payment = useSelector((state) => selectPaymentById(state, paymentId));
  const { selectedPayments, expandedPayment } = useSelector(
    (state) => state.paymentList
  );
  const { dense } = useSelector((state) => state.applicationTable);
  const amount = payment.amount
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  const labelId = `${
    selectedPayments.includes(paymentId) ? "Deselect" : "Select"
  } payment of Ksh ${amount}`;
  return (
    <>
      <ListItem
        secondaryAction={
          payment.attachments.length > 0 && (
            <Tooltip
              arrow
              title={
                expandedPayment === paymentId
                  ? "Collapse Attachments"
                  : "Expand to inspect attachments"
              }
            >
              <ExpandIconCustom
                edge="end"
                color="primary"
                size={dense ? "small" : "medium"}
                expanded={expandedPayment === paymentId}
                aria-expanded={expandedPayment === paymentId}
                aria-label={
                  expandedPayment === paymentId
                    ? "Hide application attachments"
                    : "View application attachments"
                }
                onClick={() =>
                  dispatch(
                    expandPayment(
                      expandedPayment === paymentId ? "" : paymentId
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
            dispatch(togglePayment(paymentId));
            dispatch(selectApplication(payment.applicationId));
          }}
        >
          <Checkbox
            edge="start"
            color="primary"
            checked={selectedPayments.includes(paymentId)}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={`Ksh ${amount} - ${payment.method}`}
          secondary={
            <Stack direction="row" justifyContent="space-between" mr={2}>
              <Typography
                variant="body2"
                color={
                  (payment.status === "Rejected" && "error") ||
                  (payment.status === "Approved" && "primary")
                }
              >
                {payment.status}
              </Typography>
              {payment.attachments.length > 0 && (
                <Typography variant="body2">{`${
                  payment.attachments.length
                } Attachment${
                  payment.attachments.length > 1 && "s"
                }`}</Typography>
              )}
            </Stack>
          }
        />
      </ListItem>
      <SubmittedAttachments payment={payment} />
      {expandedPayment !== paymentId && <Divider component="li" />}
    </>
  );
};

export default Payment;
