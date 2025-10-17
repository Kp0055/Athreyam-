// booking.model.ts
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "docdata", required: true }, 

  // Booking details
  consultationType: { type: String, enum: ["Chat", "Video"], required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // Example: "10:00 AM - 10:30 AM"

  // Patient info
  patientName: { type: String, required: true },
  patientContact: { type: String, required: true },
  patientAge: { type: Number },
  patientGender: { type: String, enum: ["male", "female", "other"] },

  // Extra details
  symptoms: { type: String },

  // Payment
  fee: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["paid", "failed","refund"], default: "pending" },

  // Technical
//   videoLink: { type: String },
//   chatRoomId: { type: String },

  // Status & management
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
