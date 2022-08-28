import React from "react";
import { useGetApplicationsQuery } from "../features/application/applicationApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { applicationColumns } from "../helpers";
import ApplicationRow from "../components/ApplicationRow/ApplicationRow";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setRowsPerPage,
  toggleDense,
} from "../features/application/applicationTableSlice";
import { MainTableCell } from "../Custom";
import { useGetUsersQuery } from "../features/user/usersApiSlice";
import { useGetCoursesQuery } from "../features/course/courseApiSlice";
import { useGetPaymentsQuery } from "../features/payment/paymentApiSlice";

const Applications = () => {
  const {
    data: applications,
    isLoading: isApplicationsLoading,
    isSuccess: isApplicationsSuccess,
    isError: isApplicationsError,
    error: errorApplications,
  } = useGetApplicationsQuery();

  const {
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
    isError: isUsersError,
    error: errorUsers,
  } = useGetUsersQuery();

  const {
    isLoading: isCoursesLoading,
    isSuccess: isCoursesSuccess,
    isError: isCoursesError,
    error: errorCourses,
  } = useGetCoursesQuery();

  const {
    isLoading: isPaymentsLoading,
    isSuccess: isPaymentsSuccess,
    isError: isPaymentsError,
    error: errorPayments,
  } = useGetPaymentsQuery();

  const success = [
    isApplicationsSuccess,
    isPaymentsSuccess,
    isUsersSuccess,
    isCoursesSuccess,
  ].every(Boolean);

  const loading =
    isApplicationsLoading ||
    isUsersLoading ||
    isCoursesLoading ||
    isPaymentsLoading;
  const error =
    isApplicationsError || isUsersError || isCoursesError || isPaymentsError;

  const dispatch = useDispatch();
  const { dense, page, rowsPerPage } = useSelector(
    (state) => state.applicationTable
  );

  let content;

  if (loading) {
    content = (
      <>
        <CircularProgress />
        <Typography>Loading portal applications ... </Typography>
      </>
    );
  }

  if (error) {
    content = (
      <Typography color="error">{`Something went wrong loading applications ${
        errorApplications?.data?.message ||
        errorPayments?.data?.message ||
        errorUsers?.data?.message ||
        errorCourses?.data?.message
      }`}</Typography>
    );
  }

  if (success) {
    const { ids } = applications;
    const applicationContent = ids?.length ? (
      ids
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((applicationId) => (
          <ApplicationRow key={applicationId} applicationId={applicationId} />
        ))
    ) : (
      <Typography>Currently no applications to display</Typography>
    );

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
      </>
    );
  }

  return <Box sx={{ marginTop: "24px", padding: "24px" }}>{content}</Box>;
};

export default Applications;
