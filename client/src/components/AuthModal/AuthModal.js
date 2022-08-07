import React, { useEffect } from "react";
import { auth, provider } from "../../App/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  toggleModal,
  toggleAuthMode,
  resetForm,
  togglePasswordVisible,
  toggleConfirmVisible,
  setCredentials,
} from "../../features/auth/authSlice";
import {
  useGoogleAuthMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authApiSlice";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  AppBar,
  Tab,
  Tabs,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  Avatar,
} from "@material-ui/core";
import {
  AccountBox,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import GoogleButton from "react-google-button";
import useStyles from "./styles";
import { selectCurrentUser } from "../../features/user/userApiSlice";

export default function TransitionsModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    isOpen,
    authMode,
    passwordVisible,
    confirmVisible,
  } = useSelector((state) => state.auth);
  const user = null;
  // const  = userData.entities;
  console.log(user);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [googleAuth] = useGoogleAuthMutation();

  useEffect(() => {
    if (!user) {
      dispatch(toggleModal());
    }
    return () => {
      dispatch(resetForm());
    };
  }, [user, dispatch]);

  const onRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
    }
    try {
      const userData = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...userData }));
      dispatch(toggleModal());
      dispatch(resetForm());
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
      const userData = await login({ email, password }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData, user }));
      console.log(dispatch(setCredentials({ ...userData, user })));
      dispatch(toggleModal());
      dispatch(resetForm());
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

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then((result) => {
      const displayName = result.user.displayName.split(" ");
      const userData = googleAuth({
        firstName: displayName[0],
        lastName: displayName[displayName.length - 1],
        email: result.user.email,
        avatar: result.user.photoURL,
      }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      dispatch(toggleModal());
    });
  };

  return (
    <div>
      {user === null ? (
        <Button
          className={classes.auth}
          variant="contained"
          onClick={() => dispatch(toggleModal())}
        >
          Login or SignUp
        </Button>
      ) : (
        <div className={classes.avatar}>
          <Avatar
            className={classes.circle}
            alt={user?.firstName}
            src={user?.avatar}
          >
            {user?.firstName?.substring(0, 2).toUpperCase()}
          </Avatar>
          <Typography color="textPrimary">
            {" "}
            Hi,
            <br /> {user?.firstName} {user?.lastName}
          </Typography>
        </div>
      )}
      <Modal
        aria-labelledby="authenticate-account-modal"
        aria-describedby="modal-to-authenticate-into-account"
        className={classes.modal}
        open={isOpen}
        onClose={() => dispatch(toggleModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Tabs
                value={authMode}
                className={classes.tabs}
                classes={{ indicator: classes.indicator }}
                onChange={() => dispatch(toggleAuthMode())}
              >
                <Tab
                  className={classes.tab}
                  value={"login"}
                  icon={<AccountBox />}
                  label="Login"
                />
                <Tab
                  className={classes.tab}
                  value={"register"}
                  icon={<PersonAdd />}
                  label="Register"
                />
              </Tabs>
            </AppBar>
            <form
              onSubmit={authMode === "Login" ? onRegister : onLogin}
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
                        id="lastName"
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        autoComplete="lname"
                        onChange={(e) => dispatch(setLastName(e.target.value))}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    value={email}
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
                      fullWidth
                      required
                      onChange={(e) =>
                        dispatch(setConfirmPassword(e.target.value))
                      }
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
                    />
                  </Grid>
                )}
                {(isLoginLoading || isRegisterLoading) && (
                  <Grid
                    item
                    container
                    xs={12}
                    direction="row"
                    alignItems="center"
                  >
                    <CircularProgress
                      style={{ color: "green", marginRight: "20px" }}
                    />
                    <Typography>
                      {authMode === "register"
                        ? "Registering your account."
                        : "Logging into your account."}
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
                    {authMode === "login" ? "Login" : "Register"}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <GoogleButton
                    label="Continue with Google"
                    style={{ width: "auto", borderRadius: "4px" }}
                    onClick={signInWithGoogle}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
