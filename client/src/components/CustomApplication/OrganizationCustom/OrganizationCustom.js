import React from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setSponsorName,
  setSponsorEmail,
  setSponsorPhoneNumber,
  setSponsorAddress,
  setSponsorCounty,
} from "../../../features/application/customApplicationSlice";
const OrganizationCustom = () => {
  const dispatch = useDispatch();
  const {
    sponsorName,
    sponsorEmail,
    sponsorPhoneNumber,
    sponsorAddress,
    sponsorCounty,
  } = useSelector((state) => state.customApplication);
  return (
    <Grid
      item
      container
      xs={12}
      direction="row"
      spacing={3}
      justifyContent="space-between"
    >
      <Grid item xs={12}>
        <Typography variant="h3">
          New application sponsor information
        </Typography>
        <Typography>All fields are mandatory.</Typography>
        <Typography variant="subtitle2" color="primary">
          While reviewing the application, you may save it on the platform for
          future applications.
        </Typography>
      </Grid>
      <Grid item xs={4}>
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
      <Grid item xs={4}>
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
      <Grid item xs={4}>
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
      <Grid item xs={8}>
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
      <Grid item xs={4}>
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
    </Grid>
  );
};

export default OrganizationCustom;
