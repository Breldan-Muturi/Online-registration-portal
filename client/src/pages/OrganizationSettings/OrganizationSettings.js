import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrganization } from "../../features/organization/organizationSlice";
// import { useNavigate } from 'react-router-dom'
import useStyles from "./styles";
import FileBase from "react-file-base64";

const OrganizationSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const navigate = useNaviga=te();
  const { user } = useSelector((state) => state.auth);
  const { status, message } = useSelector((state) => state.organization);
  const [organizationData, setOrganizationData] = useState({
    createdBy: user._id,
    admins: [user._id],
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    county: "",
    organizationLogo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrganization(organizationData));
    if (status === "success") {
      setOrganizationData({
        createdBy: "",
        admins: [],
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        county: "",
        organizationLogo: "",
      });
    }
  };

  const onChange = (e) => {
    setOrganizationData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, phoneNumber, address, county, organizationLogo } =
    organizationData;

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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FileBase
            name="organizationLogo"
            value={organizationLogo}
            id="organizationLogo"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setOrganizationData({
                ...organizationData,
                organizationLogo: base64,
              })
            }
            fullWidth
          />
        </Grid>
        {status !== "success" && (
          <Grid item container xs={12} direction="row" alignItems="center">
            {status === "loading" && <CircularProgress />}
            <Typography color={status === "loading" ? "textPrimary" : "error"}>
              {status === "loading" ? "Creating new organization." : message}
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
