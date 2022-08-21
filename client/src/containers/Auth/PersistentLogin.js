import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshTokenQuery } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { Typography } from "@mui/material";
import useStyles from "./styles";

const PersistentLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    data: refreshData,
    isLoading,
    isSuccess,
    isError,
  } = useRefreshTokenQuery();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refreshData;
      isSuccess && dispatch(setCredentials(refreshData));
      isError && dispatch(logOut());
    };
    verifyRefreshToken();
  }, [dispatch, refreshData]);

  return (
    <>
      {isLoading ? (
        <Typography className={classes.notify}>Loading ...</Typography>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;
