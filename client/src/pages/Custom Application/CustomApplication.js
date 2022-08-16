import React from "react";
import {
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
} from "@mui/material";
import useStyles from "./styles";
import {
  SponsorInfo,
  ProgramInfo,
  ParticipantsInfo,
  ReviewApplication,
} from "../../components";
import { setActiveStep } from "../../features/application/customApplicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const CustomApplication = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    activeStep,
    isNewOrganization,
    sponsorType,
    sponsorOrganization,
    sponsorName,
    sponsorEmail,
    sponsorPhoneNumber,
    sponsorAddress,
    sponsorContactPerson,
    sponsorContactEmail,
    startDate,
    endDate,
    deliveryType,
    venue,
    isTopics,
    selectedTopicIds,
    courseId,
  } = useSelector((state) => state.customApplication);

  const goStep2 = [
    sponsorType !== "",
    isNewOrganization
      ? (sponsorName !== "",
        sponsorEmail !== "",
        sponsorPhoneNumber !== "",
        sponsorAddress !== "",
        sponsorContactPerson !== "",
        sponsorContactEmail !== "")
      : sponsorOrganization !== null || "",
  ].every(Boolean);

  const goStep3 = [
    startDate !== "",
    endDate !== "",
    deliveryType === "On premises" ? venue !== "" : deliveryType === "Online",
    isTopics ? selectedTopicIds !== [] : courseId !== "",
  ].every(Boolean);

  return (
    <Grid
      container
      direction="row"
      spacing={3}
      className={classes.form}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Grid item container direction="column" xs={12} alignItems="center">
        <Typography variant="h2">In house training application</Typography>
        <Typography variant="subtitle2">
          Complete the form below to create a custom application. After the
          KIPPRA Training Team completes and approves the application, you will
          receive an offer letter and proforma invoice.
        </Typography>
      </Grid>
      <Stepper className={classes.stepper} activeStep={activeStep}>
        <Step>
          <StepLabel>Sponsor Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Program Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Participant Information</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && <SponsorInfo />}
      {activeStep === 1 && <ProgramInfo />}
      {activeStep === 2 && <ParticipantsInfo />}
      <Grid
        item
        container
        justifyContent={
          (activeStep === 0 && "flex-end") ||
          (activeStep === 1 && "space-between") ||
          (activeStep === 2 && "flex-start")
        }
        className={classes.stepperGrid}
        spacing={2}
        xs={12}
      >
        {activeStep === 1 && (
          <Button
            startIcon={<ArrowBack />}
            color="error"
            onClick={() => dispatch(setActiveStep(0))}
          >
            Sponsor Information
          </Button>
        )}
        {(activeStep === 0 || activeStep === 2) && (
          <Button
            disabled={!goStep2}
            startIcon={activeStep === 2 && <ArrowBack />}
            endIcon={activeStep === 0 && <ArrowForward />}
            color={activeStep === 0 ? "primary" : "error"}
            onClick={() => dispatch(setActiveStep(1))}
          >
            Program Information
          </Button>
        )}
        {activeStep === 1 && (
          <Button
            disabled={!goStep2 || !goStep3}
            endIcon={activeStep === 1 && <ArrowForward />}
            color="primary"
            onClick={() => dispatch(setActiveStep(2))}
          >
            Participants Information
          </Button>
        )}
      </Grid>
      {activeStep === 2 && <ReviewApplication />}
    </Grid>
  );
};

export default CustomApplication;
