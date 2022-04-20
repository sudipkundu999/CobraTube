import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts";
import { notifyDefault } from "../../utils";

export const AuthRoutes = () => {
  const { isUserLoggedIn } = useAuth();
  useEffect(
    () => isUserLoggedIn && notifyDefault("You're already logged in!"),
    []
  );

  return isUserLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};
