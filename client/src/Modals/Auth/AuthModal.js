import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountBox from "@mui/icons-material/AccountBox";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CustomAvatar from "../../Custom/CustomAvatar";
import GoogleButton from "react-google-button";
import useStyles from "./styles";
import usePersist from "../../Hooks/usePersist";
import { theme } from "../../App/theme";
import { setCredentials } from "../../Features/global/authSlice";
import {
  useGoogleAuthMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../../Features/api/authApiSlice";
import { auth, provider } from "../../App/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../Features/global/authSlice";
import {
  toggleAuthMode,
  togglePasswordVisible,
  toggleConfirmVisible,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  reset,
} from "../../Features/forms/authFormSlice";

export default function TransitionsModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    authMode,
    passwordVisible,
    confirmVisible,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = useSelector((state) => state.authForm);
  const { isOpen, user } = useSelector((state) => state.auth);
  const [persist, setPersist] = usePersist();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [googleAuth] = useGoogleAuthMutation();

  const loading = [isLoginLoading, isRegisterLoading].some(Boolean);

  const onRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
    }
    try {
      const registerData = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(registerData));
      dispatch(reset());
      dispatch(toggleModal());
    } catch (err) {
      if (!err?.originalStatus) {
        console.log("No server response");
      } else if (err.originalStatus === 400) {
        console.log("Please add all required fields");
      } else if (err.originalStatus === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = await login({ email, password }).unwrap();
      dispatch(setCredentials(loginData));
      dispatch(reset());
      dispatch(toggleModal());
    } catch (err) {
      if (!err?.originalStatus) {
        console.log("No server response");
      } else if (err.originalStatus === 400) {
        console.log("Missing email or password");
      } else if (err.originalStatus === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const displayName = result.user.displayName.split(" ");
        const googleData = googleAuth({
          firstName: displayName[0],
          lastName: displayName[displayName.length - 1],
          email: result.user.email,
          avatar: result.user.photoURL,
        });
        return googleData;
      })
      .then((googleData) => {
        dispatch(setCredentials(googleData.data));
        setPersist(true);
        dispatch(toggleModal());
      });
  };

  return (
    <>
      {user ? (
        <div className={classes.avatar}>
          <CustomAvatar
            sx={{ bgcolor: theme.palette.primary.light }}
            className={classes.circle}
            alt={user.firstName}
            src={user.avatar}
          >
            {user.firstName.substring(0, 2).toUpperCase()}
          </CustomAvatar>
          <Typography color="textPrimary">
            {`Hi ${user.firstName} ${user.lastName}`}
          </Typography>
        </div>
      ) : (
        <Button
          className={classes.auth}
          variant="contained"
          onClick={() => dispatch(toggleModal())}
        >
          Login or SignUp
        </Button>
      )}
      <Modal
        aria-labelledby="authenticate-account-modal"
        aria-describedby="modal-to-authenticate-into-account"
        className={classes.modal}
        open={isOpen}
        onClose={() => dispatch(toggleModal())}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <Box className={classes.paper}>
            <AppBar
              position="static"
              color="default"
              className={classes.appBar}
            >
              <Tabs
                value={authMode}
                className={classes.tabs}
                onChange={() => dispatch(toggleAuthMode())}
              >
                <Tab
                  className={classes.tab}
                  value={"login"}
                  icon={<AccountBox />}
                  iconPosition="start"
                  label="Login"
                />
                <Tab
                  className={classes.tab}
                  value={"register"}
                  icon={<PersonAdd />}
                  iconPosition="start"
                  label="Register"
                />
              </Tabs>
            </AppBar>
            <form
              onSubmit={authMode === "login" ? onLogin : onRegister}
              className={classes.div}
            >
              <Grid container spacing={2}>
                {authMode === "register" && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        value={firstName}
                        name="firstName"
                        id="firstName"
                        autoComplete="fname"
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        autoFocus
                        onChange={(e) => dispatch(setFirstName(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        value={lastName}
                        name="lastName"
                        autoComplete="lname"
                        id="lastName"
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        onChange={(e) => dispatch(setLastName(e.target.value))}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    value={email}
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    type="email"
                    label="Enter Email"
                    fullWidth
                    required
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={password}
                    autoComplete="current-password"
                    name="password"
                    variant="outlined"
                    label="Enter Password"
                    type={passwordVisible ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              dispatch(togglePasswordVisible());
                            }}
                          >
                            {passwordVisible ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    required
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                  />
                </Grid>
                {authMode === "register" && (
                  <Grid item xs={12}>
                    <TextField
                      value={confirmPassword}
                      name="confirmPassword"
                      variant="outlined"
                      label="Confirm Password"
                      type={confirmVisible ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                dispatch(toggleConfirmVisible());
                              }}
                            >
                              {confirmVisible ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      required
                      onChange={(e) =>
                        dispatch(setConfirmPassword(e.target.value))
                      }
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <LoadingButton
                    loading={loading}
                    startIcon={
                      authMode === "login" ? <AccountBox /> : <PersonAdd />
                    }
                    loadingPosition="start"
                    type="submit"
                    variant="contained"
                    size="large"
                    className={classes.submit}
                  >
                    {loading
                      ? authMode === "login"
                        ? "Logging into your account."
                        : "Registering your account."
                      : authMode === "login"
                      ? "Login to your account"
                      : "Register a new account"}
                  </LoadingButton>
                  <FormControlLabel
                    control={
                      <Checkbox
                        label="Stay logged in"
                        size="small"
                        color="primary"
                        checked={persist}
                        onChange={() => setPersist((prev) => !prev)}
                      />
                    }
                    label="Stay logged in"
                    componentsProps={{ typography: { variant: "body2" } }}
                  />
                </Grid>
                {/* <Grid item xs={12}></Grid> */}
                <Grid item xs={12}>
                  <GoogleButton
                    label="Continue with Google"
                    style={{ width: "auto", borderRadius: "4px" }}
                    onClick={signInWithGoogle}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
