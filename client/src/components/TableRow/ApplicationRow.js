import React from "react";
import CustomAvatar from "../../Custom/CustomAvatar";
import MainTableCell from "../../Custom/MainTableCell";
import InnerTableCell from "../../Custom/InnerTableCell";
import ExpandIconCustom from "../../Custom/ExpandIconCustom";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ApplicationCollapse from "../../Containers/Collapse/ApplicationCollapse";
import applicationColumns from "../../Helpers/ApplicationColumns";
import { setSelected } from "../../Features/lists/applicationTableSlice";
import { selectApplicationsById } from "../../Features/api/applicationApiSlice";
import { selectCourseById } from "../../Features/api/courseApiSlice";
import { selectUserById } from "../../Features/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";

const ApplicationRow = ({ applicationId }) => {
  const dispatch = useDispatch();
  const { dense, selected } = useSelector((state) => state.applicationTable);
  const application = useSelector((state) =>
    selectApplicationsById(state, applicationId)
  );
  const applicant = useSelector((state) =>
    selectUserById(state, application.createdBy)
  );
  const course = useSelector((state) =>
    selectCourseById(state, application.courseId)
  );
  return (
    <>
      <TableRow>
        {applicationColumns.map((mappedColumn) => {
          let value = application[mappedColumn.id];

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
            value = (
              <Stack direction="row" spacing={1} alignItems="center">
                <CustomAvatar
                  size={dense ? "small" : null}
                  alt={`${applicant.firstName} ${applicant.lastName}'s avatar`}
                  src={applicant.avatar}
                >
                  {applicant.firstName.substring(0, 2).toUpperCase()}
                </CustomAvatar>
                <Typography variant="body2">{`${applicant.firstName} ${applicant.lastName}`}</Typography>
              </Stack>
            );
          }

          if (mappedColumn.id === "courseId") {
            value = course ? course.title : "Custom Application";
          }

          if (
            mappedColumn.id === "startDate" ||
            mappedColumn.id === "endDate"
          ) {
            value = new Date(application[mappedColumn.id]).toLocaleString(
              "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            );
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
