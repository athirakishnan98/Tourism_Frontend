import { isAuthenticated, checkPermission } from "../../utils";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  console.log(roles);
  return isAuthenticated() && checkPermission(roles) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
