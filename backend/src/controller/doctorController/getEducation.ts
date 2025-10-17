import Doctor from "../../models/Doctor/Doctor";

const getEducation = async (req:any,res:any)=>{
  try {
   const doctorId = (req as any).user?.id; 

    const doctor = await Doctor.findById(doctorId).select("education");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor.education);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ message: "Server error while fetching education" });
  }
};

export default getEducation;