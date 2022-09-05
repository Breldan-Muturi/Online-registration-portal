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
import {
  selectApplicationIds,
  selectCourseApplicationIds,
  selectOrganizationApplicationIds,
  selectParticipantApplicationIds,
  selectParticipantCourseApplicationIds,
  useGetApplicationsQuery,
} from "../Features/api/applicationApiSlice";
import { useGetUsersQuery } from "../Features/api/usersApiSlice";
import {
  selectCourseById,
  useGetCoursesQuery,
} from "../Features/api/courseApiSlice";
import { useGetPaymentsQuery } from "../Features/api/paymentApiSlice";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../Features/global/authSlice";
import {
  selectOrganizationById,
  useGetOrganizationsQuery,
} from "../Features/api/organizationApiSlice";
import { ROLES } from "../Config/roles";

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

  const {
    isLoading: isOrganizationsLoading,
    isSuccess: isOrganizationsSuccess,
    isError: isOrganizationsError,
    error: errorOrganizations,
  } = useGetOrganizationsQuery();

  const success = [
    isApplicationsSuccess,
    isPaymentsSuccess,
    isUsersSuccess,
    isCoursesSuccess,
    isOrganizationsSuccess,
  ].every(Boolean);

  const loading = [
    isApplicationsLoading,
    isUsersLoading,
    isCoursesLoading,
    isPaymentsLoading,
    isOrganizationsLoading,
  ].some(Boolean);

  const hasError = [
    isApplicationsError,
    isUsersError,
    isCoursesError,
    isPaymentsError,
    isOrganizationsError,
  ].some(Boolean);

  const error =
    errorApplications?.data?.message ||
    errorPayments?.data?.message ||
    errorUsers?.data?.message ||
    errorCourses?.data?.message ||
    errorOrganizations?.data?.message;

  const dispatch = useDispatch();
  const { dense, page, rowsPerPage } = useSelector(
    (state) => state.applicationTable
  );

  const user = useSelector(selectCurrentUser);

  const { courseId, organizationId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));
  const organization = useSelector((state) =>
    selectOrganizationById(state, organizationId)
  );

  const portalApplications = useSelector(selectApplicationIds);

  const courseApplications = useSelector((state) =>
    selectCourseApplicationIds(state, courseId)
  );

  const organizationApplications = useSelector((state) =>
    selectOrganizationApplicationIds(state, organizationId)
  );

  const participantApplications = useSelector((state) =>
    selectParticipantApplicationIds(state, user.id)
  );

  const participantCourseApplications = useSelector((state) =>
    selectParticipantCourseApplicationIds(state, {
      courseId,
      participantId: user.id,
    })
  );

  let ids;
  let title;
  let content;

  if (loading) {
    content = (
      <Stack direction="row" alignItems="center">
        <CircularProgress />
        <Typography>Loading portal applications ... </Typography>
      </Stack>
    );
  }

  if (hasError) {
    content = (
      <Typography color="error">{`Something went wrong loading applications ${error}`}</Typography>
    );
  }

  if (success) {
    ids = Object.values(user?.roles).includes(ROLES.Admin)
      ? (courseId && courseApplications) ||
        (organizationId && organizationApplications) ||
        portalApplications
      : (courseId && participantCourseApplications) ||
        (organizationId && organizationApplications) ||
        participantApplications;

    title = ids.length
      ? Object.values(user?.roles).includes(ROLES.Admin)
        ? (courseId && `Applications submitted for ${course.title}`) ||
          (organizationId &&
            `Applications Submitted by ${organization.name}`) ||
          `Submitted Applications`
        : (courseId && `Your applications for ${course.title}`) ||
          (organizationId && `${organization.name} Applications`) ||
          "My Applications"
      : Object.values(user?.roles).includes(ROLES.Admin)
      ? (courseId &&
          `There are no applications for ${course.title} at this time`) ||
        (organizationId &&
          `There are no applications by ${organization.name} at this time`) ||
        "There are no applications submitted to the portal at this time"
      : (courseId &&
          `You have not submitted an application for ${course.title}`) ||
        (organizationId &&
          `${organization.name} has not submitted any application`) ||
        "You have not submitted any applications";
  }

  if (success & !ids?.length) {
    content = (
      <Typography color="error" variant="h2">
        {title}
      </Typography>
    );
  }

  if (success && ids?.length) {
    const applicationContent = ids
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

  return (
    <Box p={3} display="flex" flexDirection="column" gap={2}>
      {content}
    </Box>
  );
};

export default Applications;
