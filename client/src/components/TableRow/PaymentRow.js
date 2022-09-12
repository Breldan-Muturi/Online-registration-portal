import React, { memo } from "react";
import MainTableCell from "../../Custom/MainTableCell";
import InnerTableCell from "../../Custom/InnerTableCell";
import options from "../../Helpers/DateOptions";
import ExpandIconCustom from "../../Custom/ExpandIconCustom";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import paymentColumns from "../../Helpers/PaymentColumns";
import { setSelected } from "../../Features/lists/paymentTableSlice";
import { useGetApplicationsQuery } from "../../Features/api/applicationApiSlice";
import { useGetCoursesQuery } from "../../Features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetPaymentsQuery } from "../../Features/api/paymentApiSlice";
import Organization from "../Cells/Organization";
import Creator from "../Cells/Creator";

const PaymentRow = ({ paymentId }) => {
  const dispatch = useDispatch();
  const { dense, selected } = useSelector((state) => state.paymentTable);
  const { payment } = useGetPaymentsQuery("payments", {
    selectFromResult: ({ data }) => ({
      payment: data?.entities[paymentId],
    }),
  });

  const { createdAt, applicationId, payee, status } = payment;

  const { application } = useGetApplicationsQuery("applications", {
    selectFromResult: ({ data }) => ({
      application: data?.entities[applicationId],
    }),
  });

  const {
    courseId,
    organizationId,
    startDate,
    endDate,
    sponsorType,
    delivery,
  } = application;

  const { course } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

  const sponsor =
    sponsorType === "Organization Sponsored Application" ? (
      organizationId ? (
        <Organization organizationId={organizationId} />
      ) : (
        <Typography variant="body2">
          Sponsor organization not available
        </Typography>
      )
    ) : (
      <Typography variant="body2">{sponsorType}</Typography>
    );

  const title = course ? course.title : "Custom Application";

  return (
    <TableRow>
      {paymentColumns.map((mappedColumn) => {
        let value;

        if (mappedColumn.id === "inspect") {
          value = (
            <Tooltip
              arrow
              title={
                selected === paymentId
                  ? "Collapse payment details"
                  : "Inspect payment details"
              }
            >
              <ExpandIconCustom
                color="primary"
                aria-label={
                  selected === paymentId
                    ? "Collapse payment details"
                    : "Inspect payment details"
                }
                size={dense ? "small" : "medium"}
                expanded={selected === paymentId}
                aria-expanded={selected === paymentId}
                onClick={() =>
                  dispatch(setSelected(selected === paymentId ? "" : paymentId))
                }
              >
                <ExpandMoreOutlined />
              </ExpandIconCustom>
            </Tooltip>
          );
        }
        if (mappedColumn.id === "createdBy") {
          value = <Creator dense={dense} userId={payee} />;
        }

        if (mappedColumn.id === "sponsorType") {
          value = sponsor;
        }

        if (mappedColumn.id === "status") {
          value = (
            <Chip
              color={
                (status === "Approved" && "primary") ||
                (status === "Rejected" && "error") ||
                "default"
              }
              label={status}
            />
          );
        }

        if (mappedColumn.id === "courseId") {
          value = title;
        }

        if (mappedColumn.id === "createdAt") {
          value = new Date(createdAt).toLocaleString("en-US", options);
        }

        if (mappedColumn.id === "startDate") {
          value = new Date(startDate).toLocaleString("en-US", options);
        }

        if (mappedColumn.id === "endDate") {
          value = new Date(endDate).toLocaleString("en-US", options);
        }

        if (mappedColumn.id === "delivery") {
          value = delivery;
        }

        return (
          <MainTableCell key={mappedColumn.id} align={mappedColumn.align}>
            {value}
          </MainTableCell>
        );
      })}
    </TableRow>
  );
};

const memoizedPaymentRow = memo(PaymentRow);

export default memoizedPaymentRow;
