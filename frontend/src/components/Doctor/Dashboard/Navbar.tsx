import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaBell, FaSignOutAlt } from "react-icons/fa";
import logoutDoctor from "../../../util/logout";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logoutDoctor();
    if (success) {
      navigate("/doctor/login");
    } else {
      alert("Logout failed. Try again.");
    }
  };

  return (
    <nav className="bg-blue-900 shadow-md h-16 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="text-white text-xl font-semibold tracking-wide">
        Athreyam
      </div>

      {/* Right-side icons */}
      <div className="flex items-center gap-6">
        {/* Messages */}
        <div className="text-white hover:text-gray-300 cursor-pointer flex items-center gap-2">
          <FaEnvelope />
          <span className="hidden md:inline">Messages</span>
        </div>

        {/* Notifications */}
        <div className="text-white hover:text-gray-300 cursor-pointer flex items-center gap-2">
          <FaBell />
          <span className="hidden md:inline">Notifications</span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-white hover:text-red-400 cursor-pointer flex items-center gap-2"
        >
          <FaSignOutAlt />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
