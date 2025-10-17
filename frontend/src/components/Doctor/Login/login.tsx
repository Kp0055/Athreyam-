import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

function DoctorLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedFormData = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/doctor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // required for cookies/session
        body: JSON.stringify(trimmedFormData),
      });

      const data = await response.json();

      if (response.ok) {
        // If you're using JWT, you can optionally store the token
        // localStorage.setItem("doctorToken", data.token); // optional
        toast.success("Login successful!",{
          duration:3000,
        });
        navigate("/doctor/dashboard");
      } else {
        toast.error(data.message || "Login failed",{
          duration:3000
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Something went wrong. Please try again.",{
        duration:3000
      });
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen p-10 flex justify-start items-center"
      style={{
        backgroundImage:
          "url(https://wallpaperboat.com/wp-content/uploads/2021/03/17/71823/health-02.jpg)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg w-full max-w-md p-10"
      >
        <h1 className="text-3xl mb-8 text-center font-bold text-gray-800">Doctor Login</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-lg mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              required
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-lg mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInput}
              required
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="mt-4 text-gray-600 text-center">
            Don't have an account?
            <Link
              to="/doctor/Register"
              className="text-blue-500 hover:underline ml-1"
            >
              Register
            </Link>
          </div>

          <h1 className="mt-6 text-gray-600 text-center">--- Or Login with ---</h1>

          <button
            type="button"
            className="bg-white border w-full py-3 border-black rounded text-gray-700 hover:bg-gray-200 mt-4"
          >
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorLogin;
