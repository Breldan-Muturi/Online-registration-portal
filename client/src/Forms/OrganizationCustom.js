import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  setSponsorName,
  setSponsorEmail,
  setSponsorPhoneNumber,
  setSponsorAddress,
  setSponsorCounty,
  setSponsorContactPerson,
  setSponsorContactEmail,
} from "../Features/forms/customApplicationSlice";

const OrganizationCustom = () => {
  const dispatch = useDispatch();
  const {
    sponsorName,
    sponsorEmail,
    sponsorPhoneNumber,
    sponsorAddress,
    sponsorCounty,
    sponsorContactPerson,
    sponsorContactEmail,
  } = useSelector((state) => state.customApplication);
  return (
    <Grid container spacing={2} p={1}>
      <Grid xs={4}>
        <TextField
          name="sponsorName"
          value={sponsorName}
          id="sponsorName"
          label="Organization name"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(setSponsorName(e.target.value))}
        />
      </Grid>
      <Grid xs={4}>
        <TextField
          name="sponsorEmail"
          value={sponsorEmail}
          id="sponsorEmail"
          type="email"
          label="Organization email"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(setSponsorEmail(e.target.value))}
        />
      </Grid>
      <Grid xs={4}>
        <TextField
          name="sponsorPhoneNumber"
          value={sponsorPhoneNumber}
          id="sponsorPhoneNumber"
          label="Organization phoneNumber"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(setSponsorPhoneNumber(e.target.value))}
        />
      </Grid>
      <Grid xs={8}>
        <TextField
          name="sponsorAddress"
          value={sponsorAddress}
          id="sponsorAddress"
          label="Organization address"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(setSponsorAddress(e.target.value))}
        />
      </Grid>
      <Grid xs={4}>
        <TextField
          name="sponsorCounty"
          value={sponsorCounty}
          id="sponsorCounty"
          label="Organization county"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(setSponsorCounty(e.target.value))}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          name="sponsorContactPerson"
          value={sponsorContactPerson}
          id="sponsorContactPerson"
          label="Organization Contact Person Name"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(setSponsorContactPerson(e.target.value))}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          name="sponsorContactEmail"
          value={sponsorContactEmail}
          id="sponsorContactEmail"
          label="Organization Contact Email"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(setSponsorContactEmail(e.target.value))}
        />
      </Grid>
    </Grid>
  );
};

export default OrganizationCustom;
