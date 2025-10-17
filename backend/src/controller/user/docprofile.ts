import express from "express";
import Doctor from "../../models/Doctor/Doctor"; // adjust path if needed

const router = express.Router();

// ✅ GET: Get a doctor by ID (public route)
const docProfileById = async (req:any, res:any) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);// exclude password
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default docProfileById;
