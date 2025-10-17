import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineSearch,
} from "react-icons/ai";

const navItems = [
  { text: "Home", path: "/", icon: <AiOutlineHome /> },
  { text: "Appointments", path: "/UserProfile/appointment", icon: <AiOutlineCalendar /> },
  { text: "Chat", path: "/Chat", icon: <AiOutlineMessage /> },
  { text: "Find Doctor", path: "/FindDoctor", icon: <AiOutlineSearch /> },
  { text: "List", path: "/list", icon: <AiOutlineUnorderedList /> },
  { text: "Profile", path: "/UserProfile/profile", icon: <AiOutlineUser /> },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Navbar Toggle Button */}
      <div className="md:hidden bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        <button onClick={toggleSidebar}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-white shadow-md h-screen w-64 p-5 fixed md:relative z-10 transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-6">
          <div className="hidden md:flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-700">Dashboard</h2>
          </div>

          <ul className="space-y-2 text-sm">
            {navItems.map((item, idx) => {
              const isActive = location.pathname.startsWith(item.path);

              return (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-md font-medium transition-all ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                    onClick={() => setIsOpen(false)} // close on mobile
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
