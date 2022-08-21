import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  let content;
  if (user) {
    content = <Outlet />;
  }
  return content;
};

export default RequireAuth;
