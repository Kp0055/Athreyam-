import Navbar from "../../components/User/Navbar/navbar";
import Sidebar from "../../components/User/Sidebar/sidebar";
import ProfileInfo from "../../components/User/Profile/profileInfo";
import ProfileSide from "../../components/User/Profile/profileSidebar";
import Wallet from "../../components/User/Profile/wallet";
import Appointment from "../../components/User/Profile/appointment";
import SavedPosts from "../../components/User/Profile/savedpost";

import { Routes, Route } from "react-router-dom";

function UserProfile() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <Navbar />
      </header>

      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r shadow-sm sticky top-16 h-[calc(100vh-4rem)]">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Sidebar */}
            <div className="col-span-1 bg-white rounded-lg shadow p-4">
              <ProfileSide />
            </div>

            {/* Profile Route-based Main Section */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4 min-h-[300px]">
              <Routes>
                <Route path="profile" element={<ProfileInfo />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="appointment" element={<Appointment />} />
                <Route path="saved-posts" element={<SavedPosts />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserProfile;
