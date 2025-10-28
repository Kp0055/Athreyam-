import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // ✅ Use backend URL from environment variable
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API}/api/users/verify-token`, {
          credentials: "include",
        });

        if (res.ok) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API]);

  if (loading) return <div>Loading...</div>;

  if (authenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PublicRoute;
