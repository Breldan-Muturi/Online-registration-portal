import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OrganizationCustom from "./OrganizationCustom";
import OrganizationList from "../Components/Dropdowns/Organizations/OrganizationList";
import SponsorTypes from "../Helpers/SponsorTypes";
import deliveryTypes from "../Helpers/DeliveryTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseId,
  setStartDate,
  setEndDate,
  setVenue,
  setSponsorType,
  toggleIsNewOrganization,
  setSponsorOrganization,
  setDeliveryType,
  reset,
} from "../Features/forms/customApplicationSlice";
import ParticipantsInfo from "./ParticipantsInfo";
import ReviewApplication from "../Modals/ReviewApplication/ReviewApplication";
import { useParams } from "react-router-dom";
import { selectSessionsById } from "../Features/api/sessionApiSlice";
import options from "../Helpers/DateOptions";

const Application = () => {
  const dispatch = useDispatch();
  const { courseId, sessionId } = useParams();
  const { venue, startDate, endDate } = useSelector((state) =>
    selectSessionsById(state, sessionId)
  );
  const sessionStart = new Date(startDate).toDateString("en-us", options);
  const sessionEnd = new Date(endDate).toDateString("en-us", options);
  const { sponsorType, isNewOrganization, deliveryType } = useSelector(
    (state) => state.customApplication
  );
  useEffect(() => {
    dispatch(setCourseId(courseId));
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
    dispatch(setVenue(venue));
    return () => dispatch(reset());
  }, [dispatch]);
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid xs={12}>
        <Typography color="primary" variant="h3" align="center" gutterBottom>
          {`Apply for the session in ${venue} starting from ${sessionStart} to ${sessionEnd}`}
        </Typography>
        <Typography variant="h3">Application sponsor information</Typography>
        <Typography>
          Choose to select an existing organization or add a new organization
        </Typography>
      </Grid>
      <Grid xs={12} sm={6}>
        <TextField
          select
          fullWidth
          required
          name="sponsorType"
          value={sponsorType}
          id="select-application-sponsor"
          label="Select Sponsor Type"
          onChange={(e) => dispatch(setSponsorType(e.target.value))}
          helperText="Select one of the provided sponsor types"
          variant="outlined"
        >
          {SponsorTypes.map((mappedSponsor) => (
            <MenuItem key={mappedSponsor.value} value={mappedSponsor.value}>
              {mappedSponsor.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {!isNewOrganization && <OrganizationList />}
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          id="select-delievery-type"
          label="Select Delivery Mode"
          value={deliveryType}
          onChange={(e) => dispatch(setDeliveryType(e.target.value))}
          variant="outlined"
        >
          {deliveryTypes.map((mappedDelivery) => (
            <MenuItem key={mappedDelivery.value} value={mappedDelivery.value}>
              {mappedDelivery.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          name="isNewOrganization"
          value={isNewOrganization}
          control={
            <Checkbox
              checked={isNewOrganization}
              onChange={() => (
                // eslint-disable-next-line
                dispatch(toggleIsNewOrganization()),
                dispatch(setSponsorOrganization(null))
              )}
              name="isNewOrganization"
              color="primary"
            />
          }
          label="Add a different organization to sponsor this application."
        />
      </Grid>
      {isNewOrganization && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="primary">
              You may save this organization later as you review this
              application for future applications.
            </Typography>
          </Grid>
          <OrganizationCustom />
        </>
      )}
      <ParticipantsInfo />
      <ReviewApplication />
    </Grid>
  );
};

export default Application;
