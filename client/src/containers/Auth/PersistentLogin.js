import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshTokenQuery } from "../../features/auth/authApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
  logOut,
} from "../../features/auth/authSlice";
import { Typography } from "@mui/material";
import useStyles from "./styles";

const PersistentLogin = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    data: refreshData,
    isLoading,
    isSuccess,
    isError,
  } = useRefreshTokenQuery();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refreshData;
      isSuccess && dispatch(setCredentials(refreshData));
      isError && dispatch(logOut());
    };
    !token && verifyRefreshToken();
  }, [dispatch, token, refreshData]);

  return (
    <>
      {isLoading && (
        <Typography className={classes.notify}>Loading ...</Typography>
      )}
      {isSuccess && token && <Outlet />}
      {isError && <Navigate to="/" state={{ from: location }} replace />}
    </>
  );
};

export default PersistentLogin;
