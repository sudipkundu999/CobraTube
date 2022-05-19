import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { notifyDefault } from "../../utils";

export const AuthRoutes = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  useEffect(
    () => isUserLoggedIn && notifyDefault("You're already logged in!"),
    []
  );

  return isUserLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};
