import React, { useState } from "react";
import axios from "axios";

function Register() {
  // Using a single state object to handle the form fields

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleRegister = async()=>{
    try{

      const response = await axios.post("http://localhost:5000/api/Doctor/Register",formData)
      if(response.status === 200){
        alert('done to backend')
      }else{
        alert('error')
      }
      
    }catch(error){
      console.log(error);
      
    }

  }



  return (
    <div
      className=" bg-cover h-screen flex p-20"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?t=st=1744020620~exp=1744024220~hmac=48a7226b6a25b21a3915d844ad390163cc59a7e82fcba96faddb6b59853e3814&w=1380)",
      }}
    >
      <div className="w-6/12">
        <h1 className=" flex justify-center p-5 text-2xl text-black font-bold">
          Sign Up
        </h1>
        <div className="flex flex-col justify-center items-center" >
          <label className="text-black">FirstName</label>
          <input
            type="FirstName"
            name="firstName"
            value={formData.firstName}
            className="w-2/4 p-2 border-2"
            placeholder="FirstName"
            onChange={handleInputChange}
          />
          <label className="text-black">LastName</label>
          <input
            type="LastName"
            name="lastName"
            value={formData.lastName}
            className="w-2/4 p-2 border-2"
            placeholder="LastName"
            onChange={handleInputChange}
          />
          <label className="text-black">Email</label>
          <input
            type="Email"
            name="email"
            value={formData.email}
            className="w-2/4 p-2 border-2"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <label className="text-black">Password</label>
          <input
            type="Password"
            name="password"
            value={formData.password}
            className="w-2/4 p-2 border-2"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <label className="text-black">PhoneNumber</label>
          <input
            type="PhoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            className="w-2/4 p-2 border-2"
            placeholder="PhoneNumber"
            onChange={handleInputChange}
          />
          <button className=" bg-blue-500 p-3 mt-4 w-2/4 border rounded-3xl hover:border-zinc-900 hover:bg-blue-700 hover:text-white font-bold" onClick={handleRegister}>
            Register
          </button>
          <h1>----or----</h1>
          <button className="p-3 w-2/4  border-2 rounded-3xl">Google</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
