import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandIconCustom from "../../Custom/ExpandIconCustom";
import SubmittedAttachments from "../../Components/InnerList/SubmittedAttachments";
import { useGetPaymentsQuery } from "../../Features/api/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePayment,
  expandPayment,
} from "../../Features/lists/paymentListSlice";
import DeletePayment from "../Dialogs/DeletePayment";
import CustomListIcon from "../../Custom/CustomListIcon";
import useIsAdmin from "../../Hooks/useIsAdmin";
import ApprovePayment from "../Dialogs/ApprovePayment";
import RejectPayment from "../Dialogs/RejectPayment";

const Payment = ({ paymentId }) => {
  const dispatch = useDispatch();
  const { userId, isAdmin } = useIsAdmin();
  const {
    payment: { amount, method, status, payee },
    attachmentsCount,
  } = useGetPaymentsQuery("payments", {
    selectFromResult: ({ data }) => ({
      payment: data?.entities[paymentId],
      attachmentsCount: data?.entities[paymentId].attachments.length,
    }),
  });
  const { selectedPayments, expandedPayment } = useSelector(
    (state) => state.paymentList
  );
  const { dense } = useSelector((state) => state.applicationTable);
  const labelId = `${
    selectedPayments.includes(paymentId) ? "Deselect" : "Select"
  } payment of Ksh ${amount
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            {isAdmin && (
              <>
                <ApprovePayment paymentId={paymentId} />
                <RejectPayment paymentId={paymentId} />
              </>
            )}
            {payee === userId && <DeletePayment paymentId={paymentId} />}
            {attachmentsCount > 0 && (
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
            )}
          </>
        }
      >
        <CustomListIcon
          onClick={() => {
            dispatch(togglePayment(paymentId));
          }}
        >
          <Checkbox
            size="small"
            edge="start"
            color="primary"
            checked={selectedPayments.includes(paymentId)}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </CustomListIcon>
        <ListItemText
          disableTypography
          primary={`Ksh ${amount
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} - ${method}`}
          secondary={
            <Stack direction="row" gap={3}>
              <Typography
                variant="body2"
                color={
                  (status === "Rejected" && "error") ||
                  (status === "Approved" && "primary")
                }
              >
                {status}
              </Typography>
              {attachmentsCount > 0 && (
                <Typography variant="body2">{`${attachmentsCount} Attachment${
                  attachmentsCount > 1 && "s"
                }`}</Typography>
              )}
            </Stack>
          }
        />
      </ListItem>
      <SubmittedAttachments paymentId={paymentId} />
      {expandedPayment !== paymentId && <Divider component="li" />}
    </>
  );
};

export default Payment;
