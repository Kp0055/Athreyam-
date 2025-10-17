import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  updateProfile,
} from "../../../features/profile/profileSlice";
import type { RootState, AppDispatch } from "../../../app/store";

function ProfileInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    gender: "",
    dob: "",
  });

  const profile = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        userName: profile.userName || "",
        email: profile.email || "",
        gender: profile.gender || "",
        dob: profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : "",
      });
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = () => {
    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => setIsEditing(false))
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 min-h-screen flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
          Personal Information
        </h1>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Email */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              placeholder="example@example.com"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
                  : "bg-gray-100 text-gray-500"
              }`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
                  : "bg-gray-100 text-gray-500"
              }`}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
                  : "bg-gray-100 text-gray-500"
              }`}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
                  : "bg-gray-100 text-gray-500"
              }`}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-1 sm:col-span-2 mt-4 flex flex-col sm:flex-row justify-center gap-4">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 w-full sm:w-auto"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEditToggle}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 w-full sm:w-auto"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
