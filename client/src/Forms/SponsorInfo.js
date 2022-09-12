import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OrganizationCustom from "./OrganizationCustom";
import OrganizationList from "../Components/Dropdowns/FormLabels/OrganizationList";
import SponsorTypes from "../Helpers/SponsorTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  setSponsorOrganization,
  setSponsorType,
  toggleIsNewOrganization,
} from "../Features/forms/customApplicationSlice";

const SponsorInfo = () => {
  const dispatch = useDispatch();
  const { sponsorType, isNewOrganization } = useSelector(
    (state) => state.customApplication
  );
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid xs={12}>
        <Typography variant="h3">Application sponsor information</Typography>
        <Typography>
          Choose to select an existing organization or add a new organization
        </Typography>
      </Grid>
      <Grid xs={6}>
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
      <Grid xs={6}>
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
          <Grid xs={12}>
            <Typography variant="subtitle2" color="primary">
              You may save this organization later as you review this
              application for future applications.
            </Typography>
          </Grid>
          <OrganizationCustom />
        </>
      )}
    </Grid>
  );
};

export default SponsorInfo;
