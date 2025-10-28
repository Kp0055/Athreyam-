import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import toast from "react-hot-toast";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    gender: "",
    experience: "",
    dob: "",
    phoneNumber: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    languages: "",
    email: "", // Added: email was missing
  });

   const API = process.env.REACT_APP_API_URL;

  // Get doctor data from Redux
  const reduxData = useSelector((state: RootState) => state.doctor);

  // Pre-fill form with Redux data
  useEffect(() => {
    if (reduxData) {
      setFormData((prev) => ({
        ...prev,
        firstname: reduxData.firstName || "",
        lastname: reduxData.lastName || "",
        phoneNumber: reduxData.phoneNumber?.toString() || "",
        email: reduxData.email || "",
        bio: reduxData.bio || "",
        gender: reduxData.gender || "",
        experience: reduxData.experience || "",
        dob: reduxData.dob || "",
        city: reduxData.city || "",
        state: reduxData.state || "",
        country: reduxData.country || "",
        languages: reduxData.languages ? reduxData.languages.join(", ") : "",
      }));
    }
  }, [reduxData]);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/doctor/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!", { duration: 3000 });
      } else {
        toast.error(data.message || "Update failed.", { duration: 3000 });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong. Please try again later.", { duration: 3000 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>

      {/* Firstname / Lastname */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Gender / Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="0-5">0-5 Years</option>
            <option value="5-10">5-10 Years</option>
            <option value="10+">10+ Years</option>
          </select>
        </div>
      </div>

      {/* DOB / Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zip Code"
          value={formData.zipcode}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Languages */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Languages (comma separated)</label>
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
