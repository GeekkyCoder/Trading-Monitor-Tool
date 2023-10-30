import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const RequireAuth = ({ allowedRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  //only uzi can access this
  return user?.data?.role === allowedRole ? (
    <Outlet />
  ) : user?.data ? (
    <Navigate
      to="/authentication/unauthorized"
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;