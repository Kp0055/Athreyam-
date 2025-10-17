import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from '../components/User/ProtectedRoute'
import PublicRoute from "../components/User/publicRoute";

const Loading = React.lazy(() => import('../components/Reusable/loader'));
const Home = React.lazy(() => import("../pages/User/home"));
const Login = React.lazy(() => import("../pages/User/LoginPage"));
const Register = React.lazy(() => import("../pages/User/register"));
const UserProfile = React.lazy(() => import("../pages/User/profile"));
const Chat = React.lazy(() => import("../pages/User/chat"));
const SearchDoctor = React.lazy(() => import("../pages/User/findDoctor"));
const Docprofile = React.lazy(() => import("../pages/User/docProfile"));
const NotFound = React.lazy(() => import("../pages/User/notFound"));

function UserRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="register" element={<Register />} />
        <Route path="userprofile/*" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="finddoctor" element={<ProtectedRoute><SearchDoctor /></ProtectedRoute>} />
        <Route path="docProfileViewGetDoctor/:id" element={<ProtectedRoute><Docprofile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default UserRoutes;
