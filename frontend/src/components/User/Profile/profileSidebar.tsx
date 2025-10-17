import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  HiUserCircle,
  HiCalendar,
  HiDocumentText,
  HiCreditCard,
  HiBookmark,
  HiBell,
} from "react-icons/hi";

function Profile() {
  const profile = useSelector((state: RootState) => state.profile);

  const navItems = [
    { to: "profile", label: "Profile", icon: <HiUserCircle className="text-lg" /> },
    { to: "appointment", label: "Appointment", icon: <HiCalendar className="text-lg" /> },
    { to: "medical-records", label: "Medical Records", icon: <HiDocumentText className="text-lg" /> },
    { to: "wallet", label: "Wallet", icon: <HiCreditCard className="text-lg" /> },
    { to: "saved-posts", label: "Saved Posts", icon: <HiBookmark className="text-lg" /> },
    { to: "notifications", label: "Notifications", icon: <HiBell className="text-lg" /> },
  ];

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6 mb-10">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          className="w-32 h-40 rounded-xl object-cover border shadow-md"
          src="https://imgs.search.brave.com/wqdJPKWhJxDpF_Vv24dLluNVoIyy78Ie7L8dDgvX5vA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTI2/MjMxNS5qcGc"
          alt="Profile"
        />
      </div>

      {/* Name & Email */}
      <div className="text-center border-b w-full pb-4 mb-4">
        <p className="text-lg font-semibold text-gray-800">
          {profile?.firstName} {profile?.lastName}
        </p>
        <p className="text-sm text-gray-600">{profile?.email}</p>
      </div>

      {/* Navigation Links */}
      <nav className="w-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-center">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-blue-500 rounded-full hover:bg-blue-100 hover:text-blue-800 hover:border-black transition duration-200"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Nested Routes Rendered Here */}
      <div className="w-full mt-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
