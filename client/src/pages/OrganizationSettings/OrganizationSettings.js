import React from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setAddress,
  setPhoneNumber,
  setCounty,
  setOrganizationLogo,
  reset,
} from "../../features/organization/organizationSlice";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useCreateOrganizationMutation } from "../../features/organization/organizationApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

const OrganizationSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOrganization, { isLoading, isSuccess, error }] =
    useCreateOrganizationMutation();
  const { name, email, address, phoneNumber, county, organizationLogo } =
    useSelector((state) => state.organization);
  const user = useSelector(selectCurrentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrganization({
      name,
      email,
      address,
      phoneNumber,
      county,
      organizationLogo,
      createdBy: user.id,
      admins: [user.id],
    });
    if (isSuccess) {
      dispatch(reset());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid
        item
        container
        xs={12}
        direction="row"
        spacing={3}
        justifyContent="space-between"
      >
        <Grid item xs={12}>
          <Typography variant="h2">Create a New Organization</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="name"
            value={name}
            id="name"
            label="Organization name"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setName(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="email"
            value={email}
            id="email"
            type="email"
            label="Organization email"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="phoneNumber"
            value={phoneNumber}
            id="phoneNumber"
            label="Organization phoneNumber"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="address"
            value={address}
            id="address"
            label="Organization address"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setAddress(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="county"
            value={county}
            id="county"
            label="Organization county"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setCounty(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <FileBase
            name="organizationLogo"
            value={organizationLogo}
            id="organizationLogo"
            type="file"
            multiple={false}
            onDone={({ base64 }) => dispatch(setOrganizationLogo(base64))}
            fullWidth
          />
        </Grid>
        {!isSuccess && (
          <Grid item container xs={12} direction="row" alignItems="center">
            {isLoading && <CircularProgress />}
            <Typography color={isLoading ? "textPrimary" : "error"}>
              {isLoading
                ? "Creating new organization."
                : `Something went wrong creating the organization <br /> ${error}`}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            className={classes.submit}
          >
            Create New Organization
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrganizationSettings;
