import React, { useEffect, useState } from "react";
import BookingModal from "../../User/FindDoctor/bookingDoctor";

type Props = {
  doctors: any[]; // filtered doctors passed from parent
};

function AllDoctorList({ doctors }: Props) {
  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<null | { _id: string; firstName: string }>(null);
  const [currentUserFollowing, setCurrentUserFollowing] = useState<string[]>([]); // IDs user is following
  const [loadingFollow, setLoadingFollow] = useState<string | null>(null); // To disable buttons while toggling

  useEffect(() => {
    // Fetch current user following list
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch current user");
        const data = await res.json();
        setCurrentUserFollowing(data.following || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUser();

    if (doctors.length === 0) {
      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/users/findDoctor", {
            method: "GET",
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error("Data not found");
          }
          const data = await res.json();
          setDoctorList(data.response || []);
        } catch (err) {
          console.error("Failed to fetch data", err);
        }
      };

      fetchData();
    }
  }, [doctors]);

  const doctorsToDisplay = doctors.length > 0 ? doctors : doctorList;

  const handleFollowToggle = async (doctorId: string) => {
    setLoadingFollow(doctorId);
    try {
      // Toggle follow/unfollow
      const res = await fetch(`http://localhost:5000/api/users/follow/${doctorId}`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to toggle follow");

      const data = await res.json();
      // Backend should return updated following list for current user
      setCurrentUserFollowing(data.following);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFollow(null);
    }
  };

  const isFollowing = (doctorId: string) => currentUserFollowing.includes(doctorId);

  return (
    <div className="flex flex-col w-full gap-6 p-4">
      {doctorsToDisplay.length === 0 && (
        <p className="text-center text-gray-600">No doctors found</p>
      )}
      {doctorsToDisplay.map((doctor: any, idx: number) => (
        <div
          key={doctor._id || idx}
          className="flex flex-col md:flex-row justify-evenly p-4 h-auto md:h-[250px] w-full border border-black bg-white rounded-xl shadow-md"
        >
          {/* Profile Image and Follow */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
            <img
              src={doctor.imageUrl ? `http://localhost:5000/${doctor.imageUrl}` : "https://via.placeholder.com/150"}
              alt="Doctor Profile"
              className="h-28 rounded-full"
            />
            <button
              disabled={loadingFollow === doctor._id}
              onClick={() => handleFollowToggle(doctor._id)}
              className={`mt-2 rounded-xl px-8 py-1 font-semibold text-white ${
                isFollowing(doctor._id)
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition duration-300`}
            >
              {loadingFollow === doctor._id ? "Processing..." : isFollowing(doctor._id) ? "Unfollow" : "Follow"}
            </button>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center">
            <h1 className="font-extrabold text-lg">{doctor.firstName}</h1>
            <h2 className="text-gray-700">{doctor.speciality || "Speciality not available"}</h2>
            <h2>{doctor.experience || "Experience not available"}</h2>
            <h2>(0 Reviews)</h2>
            <h2>
              {doctor.city}, {doctor.state} - {doctor.country}
            </h2>
          </div>

          {/* Fees and Booking */}
          <div className="w-full md:w-1/3 flex flex-col justify-center items-center text-center">
            <h2>98% (252 Votes)</h2>
            <h2>Video: ₹700 | Chat: ₹599</h2>
            <button
              className="px-8 py-2 bg-blue-500 text-white rounded-full mt-3"
              onClick={() =>
                setSelectedDoctor({
                  _id: doctor._id,
                  firstName: doctor.firstName,
                })
              }
            >
              Book Appointment
            </button>

            {selectedDoctor && selectedDoctor._id === doctor._id && (
              <BookingModal
                isOpen={!!selectedDoctor}
                doctorId={selectedDoctor._id}
                doctorName={selectedDoctor.firstName}
                onClose={() => setSelectedDoctor(null)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllDoctorList;
