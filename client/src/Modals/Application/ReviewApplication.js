import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  toggleIsOpenReview,
} from "../../Features/forms/customApplicationSlice";
import { useCreateApplicationMutation } from "../../Features/api/applicationApiSlice";
import { useNavigate } from "react-router-dom";
import { useGetOrganizationsQuery } from "../../Features/api/organizationApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { useGetUsersQuery } from "../../Features/api/usersApiSlice";

const ReviewApplication = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    sponsorType,
    sponsorOrganization,
    sponsorName,
    sponsorEmail,
    sponsorPhoneNumber,
    sponsorAddress,
    sponsorCounty,
    sponsorContactPerson,
    sponsorContactEmail,
    sponsorLogo,
    courseId,
    selectedTopicIds,
    startDate,
    endDate,
    deliveryType,
    venue,
    participants,
    isNewOrganization,
    isOpenReview,
  } = useSelector((state) => state.customApplication);

  const { name, phoneNumber, email, adminId } = useGetOrganizationsQuery(
    "organizations",
    {
      selectFromResult: ({ data }) => ({
        name: data?.entities[sponsorOrganization]?.name,
        phoneNumber: data?.entities[sponsorOrganization]?.phoneNumber,
        email: data?.entities[sponsorOrganization]?.email,
        adminId: data?.entities[sponsorOrganization]?.admins[0],
      }),
    }
  );

  const {
    organizationContact: { firstName, lastName, email: contactEmail },
  } = useGetUsersQuery("users", {
    selectFromResult: ({ data }) => ({
      organizationContact: data?.entities[adminId] ?? "",
    }),
  });

  const { userId: createdBy } = useIsAdmin();
  const [createApplication, { isLoading, isSuccess, isError, error }] =
    useCreateApplicationMutation();

  const canSubmit = participants !== [] && !isLoading;

  const handleSubmitApplication = async () => {
    await createApplication({
      createdBy,
      sponsorType,
      sponsorOrganization,
      sponsorName,
      sponsorEmail,
      sponsorPhoneNumber,
      sponsorAddress,
      sponsorCounty,
      contactPerson: isNewOrganization
        ? sponsorContactPerson
        : `${firstName} ${lastName}`,
      contactEmail: isNewOrganization ? sponsorContactEmail : `${contactEmail}`,
      sponsorLogo,
      courseId,
      topics: selectedTopicIds,
      startDate,
      endDate,
      delivery: deliveryType,
      venue,
      participants,
    });
    {
      isSuccess && dispatch(toggleIsOpenReview());
      dispatch(reset());
      navigate("/applications");
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Button
        disabled={!canSubmit}
        variant="contained"
        color="primary"
        onClick={() => dispatch(toggleIsOpenReview())}
      >
        Review this application
      </Button>
      <Modal
        aria-labelledby="submit-custom-application"
        aria-describedby="Review application information before final submission"
        className={classes.modal}
        open={isOpenReview}
        onClose={() => dispatch(toggleIsOpenReview())}
        closeAfterTransition
      >
        <Fade in={isOpenReview}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Typography>Review your custom application</Typography>
            </AppBar>
            <Grid item container className={classes.grid}>
              <Typography className={classes.info}>
                Application Sponsor Type: <strong>{sponsorType}</strong> <br />
                Mode of Delivery: <strong>{deliveryType}</strong> <br />
                {deliveryType === "On premises" && (
                  <>
                    Application Venue: <strong>{venue}</strong>
                  </>
                )}
                <br />
                Organization:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorName}</strong>
                ) : (
                  <strong>{name}</strong>
                )}{" "}
                <br />
                Organization email:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorEmail}</strong>
                ) : (
                  <strong>{email}</strong>
                )}{" "}
                <br />
                Organization Phone Number:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorPhoneNumber}</strong>
                ) : (
                  <strong>{phoneNumber}</strong>
                )}{" "}
                <br />
                Organization Contact Person:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorContactPerson}</strong>
                ) : (
                  <strong>{`${firstName} ${lastName}`}</strong>
                )}
                <br />
                Organization Contact Email:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorContactEmail}</strong>
                ) : (
                  <strong>{contactEmail}</strong>
                )}{" "}
                <br />
                Participants Count: <strong>{participants?.length}</strong>
              </Typography>
              <Grid item container justifyContent="center">
                {(isLoading || isError) && (
                  <Typography color={isLoading ? "primary" : "error"}>
                    {isLoading
                      ? "Submitting your application"
                      : "There was an error submitting this application. Please refresh the page and try again"}
                  </Typography>
                )}
                {(!isLoading || !isError) && (
                  <Button
                    disabled={!canSubmit}
                    color="primary"
                    variant="contained"
                    onClick={handleSubmitApplication}
                  >
                    Submit this Application
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default ReviewApplication;
