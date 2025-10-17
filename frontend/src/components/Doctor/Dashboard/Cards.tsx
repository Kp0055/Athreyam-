import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaUsers } from "react-icons/fa";

function Cards() {
  const [counts, setCounts] = useState({
    scheduled: 0,
    cancelled: 0,
    totalPatients: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctor/dashboard-counts", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    {
      title: "Scheduled",
      count: counts.scheduled,
      icon: <FaCalendarCheck className="text-blue-500 text-3xl" />,
    },
    {
      title: "Cancelled",
      count: counts.cancelled,
      icon: <FaCalendarCheck className="text-red-500 text-3xl" />,
    },
    {
      title: "Total Patients",
      count: counts.totalPatients,
      icon: <FaUsers className="text-purple-500 text-3xl" />,
    },
  ];

  return (
    <div className="p-8 flex gap-6 flex-wrap">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="w-80 h-48 bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gray-100 rounded-full">
              {card.icon}
            </div>
            <div>
              <h2 className="text-lg text-gray-500 capitalize">{card.title}</h2>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {loading ? "..." : card.count}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
