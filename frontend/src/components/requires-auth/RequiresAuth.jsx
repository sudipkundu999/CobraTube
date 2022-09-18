import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { notifyDefault } from "../../utils";

export const RequiresAuth = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
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
