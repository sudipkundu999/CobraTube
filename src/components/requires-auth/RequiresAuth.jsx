import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";
import { notifyDefault } from "../../utils";

export const RequiresAuth = () => {
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(
    () => !isUserLoggedIn && notifyDefault("Please Login to continue"),
    []
  );

  return isUserLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
