import { Outlet } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useRefreshTokenQuery } from "../../features/auth/authApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
} from "../../features/auth/authSlice";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

const PersistentLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: refreshData, isLoading } = useRefreshTokenQuery();
  const token = useSelector(selectCurrentToken);

  const verifyRefreshToken = useCallback(async () => {
    await refreshData;
    !token && dispatch(setCredentials(refreshData));
  }, [token, dispatch, refreshData]);

  useEffect(() => {
    verifyRefreshToken();
  }, [verifyRefreshToken]);

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
