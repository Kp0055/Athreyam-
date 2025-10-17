import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai"; // Make sure this import is present
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token =
      document.cookie.includes("token") || localStorage.getItem("token");
    console.log(token);
    setIsLoggedIn(!!token);
  }, []);

  const handleNav = () => setNav(!nav);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/UserProfile/profile");
  };

  return (
    <div className="bg-[#0D47A1] flex justify-between items-center h-20 mx-auto px-4 text-white border-b-2 border-blue-200">
      <h1 className="w-full text-2xl font-bold">Athreyam</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-4">
        <button
          className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-[#1EECF2] transition duration-300"
          onClick={handleProfile}
        >
          <AiOutlineUser size={20} />
          Profile
        </button>

        {isLoggedIn ? (
          <button
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            <AiOutlineLogout size={20} />
            Logout
          </button>
        ) : (
          <button
            className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleLogin}
          >
            <AiOutlineLogin size={20} />
            Login
          </button>
        )}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation */}
      <ul
        className={`${
          nav ? "left-0" : "left-[-100%]"
        } fixed md:hidden top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500`}
      >
        <h1 className="text-3xl font-bold text-[#1EECF2] m-4">vitalys</h1>

        <li
          className="p-4 border-b border-gray-600 hover:bg-[#1EECF2] hover:text-black cursor-pointer"
          onClick={handleProfile}
        >
          Profile
        </li>
        {isLoggedIn ? (
          <li
            className="p-4 border-b border-gray-600 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        ) : (
          <li
            className="p-4 border-b border-gray-600 hover:bg-green-500 hover:text-white cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
