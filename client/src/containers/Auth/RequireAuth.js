import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
