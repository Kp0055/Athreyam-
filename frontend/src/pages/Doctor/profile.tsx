import React from "react";
import DoctorProfile from "../../components/Doctor/Profile/Docprofile";
import Navbar from "../../components/Doctor/Dashboard/Navbar";
import Sidebar from "../../components/Doctor/Dashboard/Slidebar";

function Profile() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p- overflow-y-auto">
          <DoctorProfile />
        </div>
      </div>
    </div>
  );
}

export default Profile;
