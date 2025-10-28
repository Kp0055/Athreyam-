import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  fetchProfile,
  fetchDoctorById,
} from "../../../features/doctor/doctorSlice";

interface Post {
  _id: string;
  image: string;
  caption: string;
}

 const API = process.env.REACT_APP_API_URL;

const ProfileView = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const doctor = useSelector((state: RootState) => state.doctor);

  const [posts, setPosts] = useState<Post[]>([]);


  const [loadingPosts, setLoadingPosts] = useState(false);

  // ✅ Fetch doctor profile (own or by ID)
  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorById(id));
      fetchDoctorPosts(id);
    } else {
      dispatch(fetchProfile());
    }
  }, [dispatch, id]);

  // ✅ Fetch doctor posts
  const fetchDoctorPosts = async (doctorId: string) => {
    try {
      setLoadingPosts(true);
      const res = await fetch(
        `${API}/api/user/doctorPosts/${doctorId}`,
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoadingPosts(false);
    }
  };


  // ✅ Loading state
  if (doctor.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  // ✅ Error state
  if (doctor.error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {doctor.error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* ===== Cover Section ===== */}
      <div className="relative">
        <img
          src={`${API}/uploads/${doctor.imageUrl}`}
          alt="Cover"
          className="w-full h-52 object-cover"
        />
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 md:left-12 md:translate-x-0 md:bottom-4">
          <img
            src={`${API}/uploads/${doctor.imageUrl}`}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>

      {/* ===== Profile Info Section ===== */}
      <div className="mt-16 md:mt-8 p-4 max-w-5xl mx-auto flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/3 text-center md:text-left">
          <h1 className="text-2xl font-semibold">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <p className="text-sm text-gray-600">{doctor.email}</p>
          <p className="mt-2 text-gray-700">{doctor.bio || "No bio available"}</p>
        </div>

        <div className="md:w-2/3 mt-6 md:mt-0 space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Experience</h3>
            <p className="text-gray-600">{doctor.experience || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">City</h3>
            <p className="text-gray-600">{doctor.city || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Country</h3>
            <p className="text-gray-600">{doctor.country || "N/A"}</p>
          </div>
        </div>
      </div>


      {/* ===== Posts Section ===== */}
      <div className="max-w-5xl mx-auto px-4 mt-10 pb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Posts</h2>

        {loadingPosts ? (
          <p className="text-gray-500 text-center">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="relative group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`${API}/uploads/${post.image}`}
                  alt={post.caption}
                  className="w-full h-52 object-cover group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition flex items-end">
                  <p className="text-white text-sm p-2 truncate">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
