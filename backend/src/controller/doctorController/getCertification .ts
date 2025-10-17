import Doctor from "../../models/Doctor/Doctor";

const getCertification = async (req:any, res:any) => {
  try {
    const docId = (req as any).user?.id;

    if (!docId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const doctorDetails = await Doctor.findById(docId).select("certifications");
    if (!doctorDetails) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    return res.status(200).json(doctorDetails.certifications);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export default getCertification;
