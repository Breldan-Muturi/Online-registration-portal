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
import paymentColumns from "../Helpers/PaymentColumns";
import MainTableCell from "../Custom/MainTableCell";
import {
  setPage,
  setRowsPerPage,
  toggleDense,
} from "../Features/lists/paymentTableSlice";
import useIsAdmin from "../Hooks/useIsAdmin";
import PaymentRow from "../Components/TableRow/PaymentRow";
import { useGetPaymentsQuery } from "../Features/api/paymentApiSlice";
import { useDispatch, useSelector } from "react-redux";

const Payments = () => {
  const dispatch = useDispatch();
  const { userId, isAdmin } = useIsAdmin();
  const { dense, page, rowsPerPage } = useSelector(
    (state) => state.paymentTable
  );
  const {
    data: payments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPaymentsQuery("payments", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" alignItems="center">
        <CircularProgress />
        <Typography>{`Loading ${
          isAdmin ? "portal" : "my"
        } payments ...`}</Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography color="error">{`Something went wrong loading ${
        isAdmin ? "portal" : "my"
      } applications: ${error?.data?.message}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids, entities } = payments;
    let paymentIds;
    if (isAdmin) {
      paymentIds = [...ids];
    } else {
      paymentIds = ids.filter(
        (paymentId) => entities[paymentId].payee === userId
      );
    }

    if (!paymentIds?.length) {
      content = (
        <Typography color="error" variant="h2">
          {isAdmin
            ? "There are no payments submitted to the portal"
            : "You have not submitted any payments to the portal"}
        </Typography>
      );
    }

    if (paymentIds?.length) {
      const paymentContent = paymentIds
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((paymentId) => (
          <PaymentRow key={paymentId} paymentId={paymentId} />
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
            {isAdmin
              ? `${paymentIds.length} Submitted payment${
                  paymentIds.length > 1 && "s"
                }`
              : `My ${paymentIds.length} payment${
                  paymentIds.length > 1 && "s"
                }`}
          </Typography>
          <Stack>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: "calc(100vh - 160px)" }}>
                <Table
                  stickyHeader
                  size={dense ? "small" : "medium"}
                  aria-label="Payments table"
                >
                  <TableHead>
                    <TableRow>
                      {paymentColumns.map((mappedColumn) => (
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
                  <TableBody>{paymentContent}</TableBody>
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

export default Payments;
