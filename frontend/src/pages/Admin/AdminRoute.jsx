import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  // If user is logged in AND is an admin, allow access to the child routes
  if (userInfo && userInfo.isAdmin) {
    return <Outlet />;
  }

  // If not an admin, redirect to login and save the location they tried to reach
  // This allows you to redirect them back if they log in with an admin account later
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;