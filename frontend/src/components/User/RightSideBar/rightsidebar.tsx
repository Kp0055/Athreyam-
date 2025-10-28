import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Reusable/button";
import Profile from "../../Reusable/profile";

interface Doctor {
  firstName?: string;
  specialty?: string;
  imgSrc?: string;
  _id?: string;
}

function Sidebar() {
  const [datavalue, setDataValue] = useState<Doctor[]>([]);
  const navigate = useNavigate();

   const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API}/api/user/getAllDoctor`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log("Fetched doctors:", data);
        setDataValue(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };

    fetchDoctors();
  }, [API]);

  const handleProfile = (id?: string) => {
    if (id) {
      // ✅ navigate to another component with doctor ID
      navigate(`docProfileViewGetDoctor/${id}`);
    } else {
      navigate("/user/docProfileView");
    }
  };

  return (
    <aside className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <header className="bg-blue-600 p-4">
        <h1 className="text-white text-xl font-semibold tracking-wide">
          Discover
        </h1>
      </header>

      {/* Content */}
      <main className="p-6">
        <section className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <h2 className="text-blue-700 font-semibold text-center">
            Explore Doctors
          </h2>
        </section>

        {datavalue.length > 0 ? (
          datavalue.map((item, index) => (
            <div key={item._id || index} className="mb-6">
              <Profile
                className="mx-auto mb-4 rounded-lg shadow-md"
                name={item.firstName || "Unknown Doctor"}
                profession={item.specialty || "Doctor"}
                imgSrc={
                  item.imgSrc ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />

              <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => handleProfile(item._id)}
                text="View Profile"
                customClass="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

           
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </main>
    </aside>
  );
}

export default Sidebar;
