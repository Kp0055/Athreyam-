import Doctor from "../../models/Doctor/Doctor";

const educationPost = async (req: any, res: any) => {
  try {
    const doctorId = (req as any).user?.id;
    const { degree, institution, year, description } = req.body;

    // Validate required fields
    if (!degree || !institution || !year) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create new education entry
    const newEducationEntry = {
      degree,
      institution,
      year,
      description,
    };

    // Add to doctor's education array
    if (!doctor.education) {
      doctor.education = [];
    }

    doctor.education.push(newEducationEntry);
    await doctor.save();

    const savedEntry = doctor.education[doctor.education.length - 1];
  } catch (error) {
    console.error("Error saving education:", error);
    res.status(500).json({ message: "Server error while saving education" });
  }
};

export default educationPost;
