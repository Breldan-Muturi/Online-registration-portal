import React from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  setSponsorOrganization,
  setSponsorType,
  toggleIsNewOrganization,
} from "../../features/application/customApplicationSlice";
import { OrganizationList, OrganizationCustom } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { SponsorTypes } from "../../helpers";

const SponsorInfo = () => {
  const dispatch = useDispatch();
  const { sponsorType, isNewOrganization } = useSelector(
    (state) => state.customApplication
  );
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h3">Application sponsor information</Typography>
        <Typography>
          Choose to select an existing organization or add a new organization
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
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
    </>
  );
};

export default SponsorInfo;
