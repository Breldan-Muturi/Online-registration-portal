import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import applicationColumns from "../Helpers/ApplicationColumns";
import ApplicationRow from "../Components/TableRow/ApplicationRow";
import MainTableCell from "../Custom/MainTableCell";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setRowsPerPage,
  toggleDense,
} from "../Features/lists/applicationTableSlice";
import { useGetApplicationsQuery } from "../Features/api/applicationApiSlice";
import { useParams } from "react-router-dom";
import useIsAdmin from "../Hooks/useIsAdmin";

const Applications = () => {
  const dispatch = useDispatch();
  const { userId, isAdmin } = useIsAdmin();
  const { dense, page, rowsPerPage } = useSelector(
    (state) => state.applicationTable
  );
  const {
    data: applications,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetApplicationsQuery("applications", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { courseId, organizationId } = useParams();

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" alignItems="center">
        <CircularProgress />
        <Typography>Loading portal applications ... </Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography color="error">{`Something went wrong loading applications ${error}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids, entities } = applications;
    let applicationIds;
    let title;

    if (courseId) {
      if (isAdmin) {
        applicationIds = ids.filter(
          (applicationId) => entities[applicationId].courseId === courseId
        );
        title = applicationIds.length
          ? `${applicationIds.length} Application${
              applicationIds.length > 1 && "s"
            } submitted for this course`
          : "There are no applications submitted for this course";
      } else {
        applicationIds = ids.filter(
          (applicationId) =>
            entities[applicationId].courseId === courseId &&
            entities[applicationId].createdBy === userId
        );
        title = applicationIds.length
          ? `Your ${applicationIds.length} application${
              applicationIds.length > 1 && "s"
            } for this course`
          : "You are not participating any applications for this course";
      }
    }

    if (organizationId) {
      applicationIds = ids.filter(
        (applicationId) => entities[applicationId].sponsorId === organizationId
      );
      title = applicationIds.length
        ? `${applicationIds.length} Application${
            applicationIds.length > 1 && "s"
          } submitted by this organization`
        : "This organization has not submitted any applications";
    }

    if (!organizationId && !courseId) {
      if (isAdmin) {
        applicationIds = [...ids];
        title = `${
          applicationIds.length ? applicationIds.length : "There are no"
        } application${
          applicationIds.length !== 1 && "s"
        } submitted through the portal`;
      } else {
        applicationIds = ids.filter(
          (applicationId) => entities[applicationId].createdBy === userId
        );
        title = `You have ${!applicationIds.length && "not"} submitted ${
          applicationIds.length ? applicationIds.length : "any"
        } applicaton${applicationIds.length !== 1 && "s"}`;
      }
    }

    if (!applicationIds?.length) {
      content = (
        <Typography color="error" variant="h2">
          {title}
        </Typography>
      );
    }
    if (applicationIds?.length) {
      const applicationContent = applicationIds
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((applicationId) => (
          <ApplicationRow key={applicationId} applicationId={applicationId} />
        ));

      const handleChangePage = (event, newPage) => {
        dispatch(setPage(newPage));
      };

      const handleChangeRowsPerPage = (event) => {
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
      };

      const handleChangeDense = () => {
        dispatch(toggleDense());
      };

      // Avoid a layout jump when reaching the last page with empty rows.
      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ids.length) : 0;

      content = (
        <>
          <Typography color="primary" variant="h2">
            {title}
          </Typography>
          <Stack>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: "calc(100vh - 160px)" }}>
                <Table
                  stickyHeader
                  size={dense ? "small" : "medium"}
                  aria-label="Applications table"
                >
                  <TableHead>
                    <TableRow>
                      {applicationColumns.map((mappedColumn) => (
                        <MainTableCell
                          key={mappedColumn.id}
                          align={mappedColumn.align}
                          style={{ minWidth: mappedColumn.minWidth }}
                        >
                          {mappedColumn.label}
                        </MainTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>{applicationContent}</TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                style={{
                  borderTop: "solid 1px rgb(224, 224, 224)",
                  minHeight: dense && "30px",
                }}
                showFirstButton
                showLastButton
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={ids.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense view"
            />
          </Stack>
        </>
      );
    }
  }

  return (
    <Box p={3} display="flex" flexDirection="column" gap={2}>
      {content}
    </Box>
  );
};

export default Applications;
