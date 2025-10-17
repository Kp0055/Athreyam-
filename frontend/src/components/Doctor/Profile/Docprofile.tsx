import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../../features/doctor/doctorSlice";
import { RootState, AppDispatch } from "../../../app/store";
import EditProfile from "./editProfileData";
import PasswordChange from "./passwordChange";
import Certification from "./certification ";
import Education from "./education";

interface TabItem {
  label: string;
  component: JSX.Element;
} 

function DoctorProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const profileinfo = useSelector((state: RootState) => state.doctor);

  const [selectedTab, setSelectedTab] = useState("General");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);


  useEffect(() => {
    dispatch(fetchProfile());
    if (profileinfo?.imageUrl) {
      setProfileImage(profileinfo.imageUrl);
    }
  }, [dispatch, profileinfo.imageUrl]);

  const tabs: TabItem[] = [
    { label: "General", component: <EditProfile /> },
    { label: "Change Password", component: <PasswordChange /> },
    { label: "Certifications", component: <Certification /> },
    { label: "Education", component: <Education /> },
    { label: "Consultation", component: <div>Consultation Section</div> },
  ];

  const selectedComponent = tabs.find(tab => tab.label === selectedTab)?.component;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file)); // Local preview
    }
  };

  const handleImageUpload = async () => {

    if (!imageFile) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("profileImage", imageFile);
      
    try {


      const res = await fetch("http://localhost:5000/api/doctor/profile-image", {
        method: "POST",
        credentials:'include',
        body: formData,  
      });


      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json(); // expects { imageUrl: "..." }
      setProfileImage(data.imageUrl);
      setImageFile(null);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
  };

  const handleImageRemove = async () => {
    try {
      const res = await fetch("/api/doctor/profile-image", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setProfileImage(null);
      setImageFile(null);
      alert("Image removed.");
    } catch (err) {
      console.error(err);
      alert("Failed to remove image.");
    }
  };

  const img = profileinfo.imageUrl

  console.log(img,'jbhbj')

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative group mb-4">
            <img 
              src={profileImage || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="Doctor Avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow"
              
            />
            {profileImage && (
              <button
                onClick={handleImageRemove}
                className="absolute top-1 right-1 bg-red-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center opacity-80 hover:opacity-100"
              >
                ×
              </button>
            )}
          </div>

          {/* Upload input */}
          <input
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-600 mb-2"
          />
          <button
            onClick={handleImageUpload}
            disabled={!imageFile}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Upload Image
          </button>

          {/* Profile Info */}
          <div className="text-center mt-6">
            <h2 className="text-xl font-semibold">
              {profileinfo.firstName} {profileinfo.lastName}
            </h2>
            <p className="text-sm text-gray-500">Psychology</p>
            <p className="text-sm text-gray-600">{profileinfo.email}</p>
            <p className="text-sm text-gray-600">{profileinfo.phoneNumber}</p>
            <p className="text-sm mt-2">
              Dr. Rakesh Kumar is a dedicated physician with 15+ years of experience...
            </p>
          </div>

          <div className="mt-4 bg-green-600 text-white p-3 text-sm rounded w-full text-center">
            <p>Languages: English, Malayalam, Hindi, Telugu, Kannada</p>
            <p>Experience: 1 year</p>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b pb-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setSelectedTab(tab.label)}
                className={`px-4 py-2 rounded-t-md transition-all ${
                  selectedTab === tab.label
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">{selectedComponent}</div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
