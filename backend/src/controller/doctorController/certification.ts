import Doctor from "../../models/Doctor/Doctor";


const postCertification = async (req: any, res: any) => {
  try {
    const { title, organization, date, credentialUrl } = req.body;

    if (!title || !organization || !date) {
      return res.status(400).json({ error: "Missing required certification fields" });
    }

    const docId = (req as any).user?.id;
    if (!docId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const doctorDetails = await Doctor.findById(docId);
    if (!doctorDetails) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const newCert = { title, organization, date, credentialUrl };

    // Ensure certifications array exists
    if (!doctorDetails.certifications) {
      doctorDetails.certifications = [];
    }

    doctorDetails.certifications.push(newCert);
    await doctorDetails.save();

    res.status(201).json(newCert);
  } catch (error) {
    console.error("Error saving certification:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default postCertification;
