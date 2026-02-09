import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-brand-primary"></span>
        <p className="font-bold text-slate-400 animate-pulse">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
