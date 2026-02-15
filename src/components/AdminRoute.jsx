import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (user && user.role === "admin") {
    return children;
  }

  if (user && !user.role) {
    return <div>Verifying Permissions...</div>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
