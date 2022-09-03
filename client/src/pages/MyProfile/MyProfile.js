import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, message } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    avatar: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    idNumber: "",
    occupation: "",
    organization: "",
    address: "",
    county: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({
      avatar: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      idNumber: "",
      occupation: "",
      organization: "",
      address: "",
      county: "",
    });
    navigate("/");
  };

  const onChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    avatar,
    firstName,
    lastName,
    phoneNumber,
    idNumber,
    occupation,
    organization,
    address,
    county,
  } = profile;

  return (
    <Box
      p={3}
      component="form"
      onSubmit={handleSubmit}
      className={classes.form}
    >
      <Grid
        item
        container
        xs={12}
        direction="row"
        spacing={3}
        justifyContent="space-between"
      >
        <Grid item xs={12}>
          <Typography variant="h2">Update your profile</Typography>
        </Grid>
        <Grid item xs={12}>
          <FileBase
            name="avatar"
            value={avatar}
            id="avatar"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setProfile({ ...profile, avatar: base64 })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="firstName"
            value={firstName}
            id="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="lastName"
            value={lastName}
            id="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="phoneNumber"
            value={phoneNumber}
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="idNumber"
            value={idNumber}
            id="idNumber"
            label="Identification Number"
            variant="outlined"
            helperText="Kenyan ID number or Passport Number"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="occupation"
            value={occupation}
            id="occupation"
            label="Occupation"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="organization"
            value={organization}
            id="organization"
            label="Organization"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="address"
            value={address}
            id="address"
            label="Address"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            name="county"
            value={county}
            id="county"
            label="County"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        {status !== "success" && (
          <Grid item container xs={12} direction="row" alignItems="center">
            {status === "loading" && <CircularProgress />}
            <Typography color={status === "loading" ? "textPrimary" : "error"}>
              {status === "loading" ? "Updating your profile" : message}
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
            Update your profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfile;
