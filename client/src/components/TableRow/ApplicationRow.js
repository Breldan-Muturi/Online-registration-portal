import React from "react";
import MainTableCell from "../../Custom/MainTableCell";
import InnerTableCell from "../../Custom/InnerTableCell";
import ExpandIconCustom from "../../Custom/ExpandIconCustom";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ApplicationCollapse from "../../Containers/Collapse/ApplicationCollapse";
import applicationColumns from "../../Helpers/ApplicationColumns";
import { setSelected } from "../../Features/lists/applicationTableSlice";
import { useGetApplicationsQuery } from "../../Features/api/applicationApiSlice";
import { useGetCoursesQuery } from "../../Features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Creator from "../Cells/Creator";
import options from "../../Helpers/DateOptions";

const ApplicationRow = ({ applicationId }) => {
  const dispatch = useDispatch();
  const { dense, selected } = useSelector((state) => state.applicationTable);
  const {
    application: {
      createdBy,
      courseId,
      startDate,
      endDate,
      status,
      sponsorType,
      delivery,
    },
  } = useGetApplicationsQuery("applications", {
    selectFromResult: ({ data }) => ({
      application: data?.entities[applicationId],
    }),
  });
  const { title } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      title: data?.entities[courseId]?.title ?? "Custom Application",
    }),
  });

  return (
    <>
      <TableRow>
        {applicationColumns.map((mappedColumn) => {
          let value;

          if (mappedColumn.id === "inspect") {
            value = (
              <Tooltip
                arrow
                title={
                  selected === applicationId
                    ? "Collapse Details"
                    : "Expand row to inspect"
                }
              >
                <ExpandIconCustom
                  color="primary"
                  aria-label={
                    selected === applicationId
                      ? "collapse details"
                      : "expand row to inspect"
                  }
                  size={dense ? "small" : "medium"}
                  expanded={selected === applicationId}
                  aria-expanded={selected === applicationId}
                  onClick={() =>
                    dispatch(
                      setSelected(
                        selected === applicationId ? "" : applicationId
                      )
                    )
                  }
                >
                  <ExpandMoreOutlined />
                </ExpandIconCustom>
              </Tooltip>
            );
          }

          if (mappedColumn.id === "createdBy") {
            value = <Creator dense={dense} userId={createdBy} />;
          }

          if (mappedColumn.id === "status") {
            value = (
              <Chip
                size={dense ? "small" : "medium"}
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

          if (mappedColumn.id === "startDate") {
            value = new Date(startDate).toDateString("en-us", options);
          }

          if (mappedColumn.id === "endDate") {
            value = new Date(endDate).toDateString("en-us", options);
          }

          if (mappedColumn.id === "sponsorType") {
            value = sponsorType;
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
      <TableRow>
        <InnerTableCell colSpan={12}>
          <ApplicationCollapse applicationId={applicationId} />
        </InnerTableCell>
      </TableRow>
    </>
  );
};

export default ApplicationRow;
