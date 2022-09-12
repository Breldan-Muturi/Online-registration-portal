import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ApplicationApprove from "../../Components/Dialogs/ApplicationApprove";
import PaymentForm from "../../Forms/PaymentForm";
import PaymentsList from "../../Lists/Payments/PaymentsList";
import { useDispatch, useSelector } from "react-redux";
import { useGetApplicationsQuery } from "../../Features/api/applicationApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import Participants from "../../Lists/Participants";
import { setActiveTab } from "../../Features/lists/applicationTableSlice";
import Approver from "../../Components/Cards/User/Approver";
import CustomToolbar from "../../Custom/CustomToolbar";
import useStyles from "./styles";
import ApplicationTab from "../../Custom/ApplicationTab";

const ApplicationCollapse = ({ applicationId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAdmin } = useIsAdmin();
  const { selected, activeTab, dense } = useSelector(
    (state) => state.applicationTable
  );
  const {
    application: { status, approvedBy, completedBy },
  } = useGetApplicationsQuery("applications", {
    selectFromResult: ({ data }) => ({
      application: data?.entities[applicationId],
    }),
  });
  const handleChange = (event, value) => {
    dispatch(setActiveTab(value));
  };

  const approvalPrompt = isAdmin ? (
    <Stack direction="row" gap={1} alignItems="center">
      <Typography color="error" variant={dense ? "body2" : "body1"}>
        This application is not approved for payments.
      </Typography>
      <ApplicationApprove applicationId={applicationId} />
    </Stack>
  ) : (
    <Typography color="error">
      You have not yet been approved to submit payments.
    </Typography>
  );

  const approver = (
    <>
      <Stack direction="column" gap={1}>
        <Typography>{`${
          approvedBy
            ? "This application was approved by:"
            : "This application has been approved"
        }`}</Typography>
        {approvedBy && <Approver approvedBy={approvedBy} />}
      </Stack>
      {status === "Completed" && (
        <Stack direction="column" gap={1}>
          <Typography>{`${
            approvedBy
              ? "This application was completed by:"
              : "This application has been completed"
          }`}</Typography>
          {approvedBy && <Approver approvedBy={completedBy} />}
        </Stack>
      )}
    </>
  );

  const payments = (
    <>
      {!isAdmin && status === "Approved" && (
        <PaymentForm applicationId={applicationId} />
      )}
      <PaymentsList applicationId={applicationId} />
    </>
  );

  return (
    <Collapse
      className={classes.collapse}
      in={selected === applicationId}
      timeout="auto"
      unmountOnExit
    >
      <CustomToolbar variant="dense" disableGutters border>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          className={classes.tabs}
          aria-label="Application Detail Tabs"
        >
          <ApplicationTab label="Approvals" value="Approvals" />
          <ApplicationTab label="Participants" value="Participants" />
          <ApplicationTab label="Payments" value="Payments" />
        </Tabs>
      </CustomToolbar>
      <Box>
        <Stack direction="row" spacing={1} p={2} alignItems="flex-start">
          {activeTab === "Approvals" &&
            (status === "Pending" ? approvalPrompt : approver)}
          {activeTab === "Participants" && (
            <Participants applicationId={applicationId} />
          )}
          {activeTab === "Payments" &&
            (status === "Pending" ? approvalPrompt : payments)}
        </Stack>
      </Box>
    </Collapse>
  );
};

export default ApplicationCollapse;
