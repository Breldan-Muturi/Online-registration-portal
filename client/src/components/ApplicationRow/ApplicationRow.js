import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { selectApplicationsById } from "../../features/application/applicationApiSlice";
import { selectCourseById } from "../../features/course/courseApiSlice";
import { applicationColumns } from "../../helpers";
import { selectUserById } from "../../features/user/usersApiSlice";
import { CustomAvatar } from "../../Custom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import useStyles from "./styles";
import ApplicationCollapse from "../ApplicationCollapse/ApplicationCollapse";
import { MainTableCell, InnerTableCell } from "../../Custom";
import { setSelected } from "../../features/application/applicationTableSlice";

const ApplicationRow = ({ applicationId }) => {
  const classes = useStyles();
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
                <IconButton
                  color="primary"
                  aria-label={
                    selected === applicationId
                      ? "collapse details"
                      : "expand row to inspect"
                  }
                  size={dense ? "small" : "medium"}
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: selected === applicationId,
                  })}
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
                </IconButton>
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
            value = `${course.title}`;
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
