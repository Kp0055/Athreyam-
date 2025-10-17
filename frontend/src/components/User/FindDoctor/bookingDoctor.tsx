import React, { useState } from "react";
import axios from "axios";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string;
  doctorName: string;
}

interface RazorpayOrderResponse {
  data: any;
  orderId: string;
  amount: number;
  currency: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  doctorId,
  doctorName,
}) => {
  const consultationFees = {
    Chat: 500,
    Video: 1000,
  };

  const [formData, setFormData] = useState({
    patientName: "",
    patientContact: "",
    patientAge: "",
    patientGender: "",
    consultationType: "",
    date: "",
    timeSlot: "",
    symptoms: "",
    fee: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "consultationType") {
      setFormData({
        ...formData,
        consultationType: value,
        fee: consultationFees[value as keyof typeof consultationFees] || 0,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    // Validate required fields
    const requiredFields = ["patientName", "patientContact", "consultationType", "date", "timeSlot"];
    for (let field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill in ${field}`);
        return;
      }
    }

    try {
      const datas: RazorpayOrderResponse = await axios.post(
        "http://localhost:5000/api/users/payment/create-order",
        { amount: formData.fee },
        { withCredentials: true }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "",
        amount: datas.data.amount,
        currency: datas.data.currency,
        name: "Doctor Consultation",
        description: "Booking Fee",
        order_id: datas.data.orderId,
        handler: async function (response: any) {
          try {
            await axios.post(
              "http://localhost:5000/api/users/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentStatus: "paid",
                bookingData: {
                  ...formData,
                  patientAge: Number(formData.patientAge),
                  doctorId,
                },
              },
              { withCredentials: true }
            );

            alert("Booking & Payment Successful!");
            onClose();
          } catch (error) {
            console.error(error);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: formData.patientName,
          email: "test@example.com",
          contact: formData.patientContact,
        },
        theme: { color: "#3399cc" },
      };

      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Something went wrong!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePayment();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Book Appointment - {doctorName}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="patientName"
            placeholder="Your Name"
            value={formData.patientName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="patientContact"
            placeholder="Contact Number"
            value={formData.patientContact}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="patientAge"
            placeholder="Age"
            value={formData.patientAge}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="patientGender"
            value={formData.patientGender}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Consultation Type</option>
            <option value="Chat">Chat</option>
            <option value="Video">Video</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="timeSlot"
            placeholder="Time Slot (e.g., 10:00 AM - 10:30 AM)"
            value={formData.timeSlot}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <textarea
            name="symptoms"
            placeholder="Describe your symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="border p-2 rounded"
          ></textarea>

          <p className="font-bold">Fee: ₹{formData.fee}</p>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Confirm & Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
