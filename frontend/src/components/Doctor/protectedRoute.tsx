import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../util/loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctor/verify-token", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setAuthenticated(true);
        else setAuthenticated(false);
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div><Loader/></div>;
  if (!authenticated) return <Navigate to="/doctor/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
