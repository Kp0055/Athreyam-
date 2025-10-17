import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedFormData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedFormData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorLogin = () => {
    navigate("/doctor/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0F7FA] px-4 py-10">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side (Banner) */}
        <div className="bg-[#0D47A1] md:w-1/2 p-8 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
          <p className="text-white mt-4">Don't have an account yet?</p>
          <Link
            to="/register"
            className="text-[#FFEB3B] underline font-medium mt-2"
          >
            Register here
          </Link>
        </div>

        {/* Right Side (Form) */}
        <div className="bg-[#E8F5E9] w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Account Login
          </h1>

          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0D47A1] text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-4 text-gray-500">--- OR ---</div>

          {/* Google OAuth */}
          <a
            href="http://localhost:5000/api/auth/google"
            className="w-full py-3 bg-white border border-gray-300 rounded-md text-center hover:bg-gray-200 transition"
          >
            Continue with Google
          </a>

          {/* Doctor Login Button */}
          <button
            onClick={handleDoctorLogin}
            className="w-full mt-4 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-200 transition"
          >
            Are you a doctor?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
