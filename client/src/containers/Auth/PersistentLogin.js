import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshTokenQuery } from "../../features/auth/authApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
} from "../../features/auth/authSlice";
import { Typography } from "@mui/material";
import useStyles from "./styles";

const PersistentLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: refreshData, isLoading } = useRefreshTokenQuery();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refreshData;
      dispatch(setCredentials(refreshData));
    };
    !token && verifyRefreshToken();
  }, [dispatch, token, refreshData]);

  return (
    <>
      {isLoading || !token ? (
        <Typography className={classes.notify}>Loading ...</Typography>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;
