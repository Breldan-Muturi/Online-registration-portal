import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ApplicationApprove from "../../Components/Dialogs/ApplicationApprove";
import PaymentForm from "../../Forms/PaymentForm";
import PaymentsList from "../../Lists/Payments/PaymentsList";
import { useSelector } from "react-redux";
import { selectApplicationsById } from "../../Features/api/applicationApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import Participants from "../../Lists/Participants";

const ApplicationCollapse = ({ applicationId }) => {
  const { isAdmin } = useIsAdmin();
  const { selected, dense } = useSelector((state) => state.applicationTable);
  const application = useSelector((state) =>
    selectApplicationsById(state, applicationId)
  );
  return (
    <Collapse in={selected === applicationId} timeout="auto" unmountOnExit>
      <Box>
        {application.status === "Pending" && (
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography color="error" variant={dense ? "body2" : "body1"}>
              This application is not yet approved for payments.
            </Typography>
            <ApplicationApprove application={application} />
          </Stack>
        )}
        {application.status === "Approved" && (
          <Stack direction="row" spacing={1} p={2} alignItems="flex-start">
            <Participants applicationId={applicationId} />
            {!isAdmin && <PaymentForm applicationId={applicationId} />}
            <PaymentsList applicationId={applicationId} />
          </Stack>
        )}
      </Box>
    </Collapse>
  );
};

export default ApplicationCollapse;
