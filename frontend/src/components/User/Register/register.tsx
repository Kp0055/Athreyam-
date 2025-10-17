import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios  from "axios"


function Register() {
  // Using a single state object to handle the form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input change for all fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  // Handle form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Console log form data for checking purpose
    console.log(formData);

    
    // Here you can implement the API call to send data to the backend

   try{

    const response = await axios.post("http://localhost:5000/api/users/register",formData,{
      headers: {
        "Content-Type": "application/json"
      }
    })

    const setResponseMessage = (response.data.message);
    if(setResponseMessage){
      alert('sucessfull done')
    }

   }catch(error){
    console.error('an  error occurred', error); 
   }
  };


  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:5000/api/users/auth/google'; 
};



  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E0F7FA] py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl md:flex">
        {/* Side Banner */}
        <div className="bg-[#0D47A1] md:w-1/3 p-8 flex flex-col justify-center items-center">
          <h1 className="text-white text-2xl font-bold">Register</h1>
          <p className="text-white mt-4">Already have an account?</p>
          <Link to="/Login" className="text-[#FFEB3B] underline mt-2">Login</Link>
        </div>

        {/* Form Section */}
        <div className="bg-[#E8F5E9] w-full md:w-2/3 p-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-mono mb-6">Create Your Account</h1>

          <form className="w-full" onSubmit={handleRegister}>
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                className="w-full border border-gray-300 rounded p-3"
                onChange={handleInputChange}
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                className="w-full border border-gray-300 rounded p-3"
                onChange={handleInputChange}
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                className="w-full border border-gray-300 rounded p-3"
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                className="w-full border border-gray-300 rounded p-3"
                onChange={handleInputChange}
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-3"
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-3"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                className="w-full border border-gray-300 rounded p-3"
                onChange={handleInputChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                className="w-full border border-gray-300 rounded p-3"
                onChange={handleInputChange}
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="bg-[#0D47A1] text-white w-full py-3 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          <h1 className="mt-6 text-gray-600">--- Or Sign up with ---</h1>

          {/* Google Sign up Button */}
          <button   
           onClick={handleGoogleSignUp}
            className="bg-white border w-full py-3 rounded text-gray-700 hover:bg-gray-200 mt-4"
          >
            GOOGLE
          </button>

          {/* Doctor Sign up Button */}
          <button
            className="bg-white border w-full py-3 rounded text-gray-700 hover:bg-gray-200 mt-4"
          >
            Are you a doctor?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
