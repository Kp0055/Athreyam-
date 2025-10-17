import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../util/loader";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctor/verify-token", {
      credentials: "include",
    })
      .then((res) => {
        setAuthenticated(res.ok);
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div><Loader /></div>;

  // ✅ If already authenticated, redirect to dashboard
  if (authenticated) return <Navigate to="/doctor/dashboard" replace />;

  return <>{children}</>;
};

export default PublicRoute;
