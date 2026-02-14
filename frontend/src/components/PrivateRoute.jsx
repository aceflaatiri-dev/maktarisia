import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const PrivateRoute = () => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // If the auth state is still loading (e.g., checking cookie/token validity)
  // show our premium glowing loader instead of redirecting immediately.
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0f172a]">
        <Loader />
      </div>
    );
  }

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />
  );
};

export default PrivateRoute;