import React, { useEffect, useState } from "react";

interface AppointmentType {
  _id: string;
  patientName: string;
  consultationType: string;
  fee: number;
  date: string;
  status: string;
  doctorId?: {
    firstName: string;
    email: string;
  };
}

function Appointment() {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/appoiment", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Fetching failed");

        const data = await res.json();
        setAppointments(data.bookings || []);
      } catch (err) {
        console.error("Internal server error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Cancel booking
  const handleCancel = async (bookingId: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookingId }),
      });

      if (!res.ok) throw new Error("Cancel failed");

      const data = await res.json();

      // Update frontend state to reflect cancellation
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === bookingId ? { ...appt, status: "cancelled" } : appt
        )
      );

      console.log("Cancelled:", data);
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading appointments...</div>;
  }

  return (
    <div className="p-4 min-h-screen bg-slate-100">
      <div className="bg-white rounded-lg shadow-2xl p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center p-5 border-b border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0">
            Appointment Details
          </h1>
          <input
            type="search"
            placeholder="Search"
            className="h-10 px-4 border border-gray-300 rounded-md w-full max-w-sm"
          />
        </div>

        {/* Appointment Cards */}
        <div className="mt-6 space-y-4">
          {appointments.length === 0 ? (
            <p className="text-center text-gray-600">No appointments found.</p>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt._id}
                className="border p-5 rounded-lg shadow-md flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gray-50"
              >
                {/* Patient Name */}
                <span className="font-semibold text-gray-900">
                  {appt.patientName}
                </span>

                {/* Details */}
                <div className="flex flex-col text-sm text-gray-700">
                  <span>
                    Date: {new Date(appt.date).toLocaleDateString("en-GB")}
                  </span>
                  <span>Consultation Type: {appt.consultationType}</span>
                  <span>Amount Paid: ₹{appt.fee}</span>
                  <span>Status: {appt.status}</span>
                </div>

                {/* Doctor Name */}
                <span className="text-gray-800">
                  {appt.doctorId?.firstName || "No doctor"}
                </span>

                {/* Cancel Button */}
                {appt.status !== "cancelled" ? (
                  <button
                    onClick={() => handleCancel(appt._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                    disabled
                  >
                    Cancelled
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
