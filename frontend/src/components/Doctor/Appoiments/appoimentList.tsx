import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaHeartbeat,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

interface Appointment {
  consultationType: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientContact: string;
  patientAge: number;
  patientGender: string;
  symptoms: string;
  fee: number;
  paymentStatus: string;
  status: string;
}

function AppointmentList() {
  const [list, setList] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filter, setFilter] = useState<string>("");

   const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const doctorAppointmentList = async () => {
      try {
        const response = await fetch(`${API}/api/doctor/appoimentlist`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to fetch appointments.", {
            duration: 3000,
          });
          throw new Error("Fetching failed from backend");
        }

        const data = await response.json();
        setList(data);

        if (data.length === 0) {
          toast("No appointments found.", {
            icon: "📭",
            duration: 3000,
          });
        } else {
          toast.success("Appointments loaded successfully!", {
            duration: 3000,
          });
        }
      } catch (err) {
        console.error("Server error:", err);
        toast.error("Unable to load appointments. Please try again later.", {
          duration: 3000,
        });
      }
    };

    doctorAppointmentList();
  }, [API]);

  const filteredList = filter
    ? list.filter((appointment) => appointment.status === filter)
    : list;

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "text-blue-600";
      case "cancelled":
        return "text-red-500";
      case "completed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Upcoming Appointments</h2>

      {/* Filter Buttons */}
      <div className="flex justify-end mb-6 space-x-3">
        {["", "scheduled", "cancelled", "completed"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === status
                ? {
                    "": "bg-gray-700 text-white",
                    scheduled: "bg-blue-600 text-white",
                    cancelled: "bg-red-600 text-white",
                    completed: "bg-green-600 text-white",
                  }[status]
                : {
                    "": "bg-gray-300 text-gray-800 hover:bg-gray-400",
                    scheduled: "bg-blue-200 text-blue-800 hover:bg-blue-300",
                    cancelled: "bg-red-200 text-red-800 hover:bg-red-300",
                    completed: "bg-green-200 text-green-800 hover:bg-green-300",
                  }[status]
            }`}
            onClick={() => setFilter(status)}
          >
            {status === "" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Appointment List */}
      <div className="space-y-5">
        {filteredList.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          filteredList.map((appointment, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow hover:shadow-lg p-5 cursor-pointer transition duration-200"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaUser className="text-blue-500" />
                  <span>{appointment.patientName}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaCalendarAlt className="text-green-500" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaClock className="text-yellow-500" />
                  <span>{appointment.timeSlot}</span>
                </div>
                <div className={`flex items-center gap-3 font-semibold ${getStatusClass(appointment.status)}`}>
                  {appointment.status === "scheduled" && <FaCheckCircle />}
                  {appointment.status === "cancelled" && <FaTimesCircle />}
                  {appointment.status === "completed" && <FaCheckCircle />}
                  <span className="capitalize">{appointment.status}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaHeartbeat className="text-pink-500" />
                  <span>{appointment.symptoms}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaInfoCircle className="text-purple-500" />
                  <span>{appointment.consultationType}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setSelectedAppointment(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-5 text-gray-900">Appointment Details</h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600" />
                <span>
                  <strong>Patient Name:</strong> {selectedAppointment.patientName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-purple-600" />
                <span>
                  <strong>Consultation Type:</strong> {selectedAppointment.consultationType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-600" />
                <span>
                  <strong>Time Slot:</strong> {selectedAppointment.timeSlot}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                <span>
                  <strong>Date:</strong> {selectedAppointment.date || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeartbeat className="text-pink-600" />
                <span>
                  <strong>Symptoms:</strong> {selectedAppointment.symptoms}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-700" />
                <span>
                  <strong>Contact:</strong> {selectedAppointment.patientContact}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-700" />
                <span>
                  <strong>Age:</strong> {selectedAppointment.patientAge}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-700" />
                <span>
                  <strong>Gender:</strong> {selectedAppointment.patientGender}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaDollarSign className="text-green-600" />
                <span>
                  <strong>Fee:</strong> ${selectedAppointment.fee}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedAppointment.paymentStatus.toLowerCase() === "paid" ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span>
                  <strong>Payment Status:</strong> {selectedAppointment.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
