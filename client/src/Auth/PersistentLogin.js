import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshTokenMutation } from "../Features/api/authApiSlice";
import usePersist from "../Hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Features/global/authSlice";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";

const PersistentLogin = () => {
  const classes = useStyles();
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [
    refreshData,
    { isUninitialized, isLoading, isSuccess, isError, error },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refreshData();
          setTrueSuccess(true);
        } catch (err) {}
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;

  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    <Typography className={classes.notify}>Loading ...</Typography>;
  } else if (isError) {
    //persist: yes, token: no
    content = (
      <Typography color="error" className={classes.notify}>
        Please login again
      </Typography>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    content = <Outlet />;
  }

  return content;
};

export default PersistentLogin;
