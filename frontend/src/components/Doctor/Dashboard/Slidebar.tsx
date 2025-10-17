import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaComments,
  FaCalendarCheck,
  FaUser,
  FaMoneyCheckAlt,
  FaBell,
  FaNewspaper,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", to: "/doctor/dashboard", icon: <FaTachometerAlt /> },
    { label: "Feed", to: "/doctor/feed", icon: <FaNewspaper /> },
    { label: "Appointments", to: "/doctor/appoimentsList", icon: <FaCalendarCheck /> },
    { label: "Chat", to: "/doctor/chat", icon: <FaComments /> },
    { label: "Profile", to: "/doctor/profile", icon: <FaUser /> },
    { label: "Payment", to: "/doctor/transcation", icon: <FaMoneyCheckAlt /> },
    { label: "Notifications", to: "/doctor/dashboard", icon: <FaBell /> },
  ];

  return (
    <div className="h-screen w-64 bg-slate-800 text-white shadow-xl sticky top-0">
      {/* Sidebar header */}

      {/* Menu */}
      <ul className="px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <li key={index}>
              <Link
                to={item.to}
                className={`flex items-center gap-4 p-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-inner"
                    : "hover:bg-slate-700 text-gray-300"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
