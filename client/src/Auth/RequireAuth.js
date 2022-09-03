import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../Features/global/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const user = useSelector(selectCurrentUser);
  const roles = Object.values(user?.roles);
  const location = useLocation();
  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
