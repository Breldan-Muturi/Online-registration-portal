import {
  AppBar,
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { toggleIsOpenReview } from "../../features/application/customApplicationSlice";
import { selectUserById } from "../../features/user/usersApiSlice";

const ReviewApplication = () => {
  const classes = useStyles();
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
    isTopics,
    searchTopicsByCourse,
    searchTopicsByTitle,
    selectedTopicIds,
    startDate,
    endDate,
    deliveryType,
    venue,
    participants,
    isOnlyParticipant,
    isNewOrganization,
    isOpenReview,
  } = useSelector((state) => state.customApplication);
  const organizationContact = useSelector((state) =>
    selectUserById(state, sponsorOrganization?.admins[0])
  );

  const canSubmit = participants !== [];

  console.log(canSubmit);

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
                  <strong>{sponsorOrganization?.name}</strong>
                )}{" "}
                <br />
                Organization email:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorEmail}</strong>
                ) : (
                  <strong>{sponsorOrganization?.email}</strong>
                )}{" "}
                <br />
                Organization Phone Number:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorPhoneNumber}</strong>
                ) : (
                  <strong>{sponsorOrganization?.phoneNumber}</strong>
                )}{" "}
                <br />
                Organization Contact Person:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorContactPerson}</strong>
                ) : (
                  <strong>
                    {organizationContact?.firstName}{" "}
                    {organizationContact?.lastName}
                  </strong>
                )}
                <br />
                Organization Contact Email:{" "}
                {isNewOrganization ? (
                  <strong>{sponsorContactEmail}</strong>
                ) : (
                  <strong>{organizationContact?.email}</strong>
                )}{" "}
                <br />
                Participants Count: <strong>{participants?.length}</strong>
              </Typography>
              <Grid item container justifyContent="center">
                <Button color="primary" variant="contained">
                  Submit this Application
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default ReviewApplication;
