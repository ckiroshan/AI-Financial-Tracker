import { Outlet } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

// Check if user is loaded & logged in
const ProtectLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;
  // If not loaded, return null (or a loading spinner)
  if (isLoaded && !isSignedIn) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectLayout;
