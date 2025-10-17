import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/Doctor/protectedRoute";
import Loader from "../util/loader";
import PublicRoute from "../components/Doctor/publicRoute";


const Login = React.lazy(() => import("../pages/Doctor/login"));
const Register = React.lazy(() => import("../pages/Doctor/register"));
const Dashboard = React.lazy(() => import("../pages/Doctor/dashboard"));
const Profile = React.lazy(() => import("../pages/Doctor/profile"));
const NotFound = React.lazy(() => import("../pages/User/notFound"));
const Feed = React.lazy(() => import("../pages/Doctor/feed"));
const DocChat = React.lazy(() => import("../pages/Doctor/chat"));
const AppoimentsList = React.lazy(() => import("../pages/Doctor/appoimentsList"));
const Transcation = React.lazy(() => import("../pages/Doctor/transcation"));

function DoctorRoutes() {
  return (
    <Suspense fallback={<div><Loader/></div>}>
      <Routes>
        {/* Paths are relative to /doctor */}
        <Route path="login" element={<PublicRoute><Login /> </PublicRoute>} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <DocChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="appoimentsList"
          element={
            <ProtectedRoute>
              <AppoimentsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="transcation"
          element={
            <ProtectedRoute>
              <Transcation />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default DoctorRoutes;
