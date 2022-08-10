import { Outlet } from "react-router-dom";
import { useEffect } from "react";
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
  console.log(refreshData);
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      dispatch(setCredentials(refreshData));
    };
    !token && verifyRefreshToken();
  }, [token, dispatch, refreshData]);

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
