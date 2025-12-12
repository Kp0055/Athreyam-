import Doctor from "../../models/Doctor/Doctor";

 const PofileDetails = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    const doctor = await Doctor.findById(userId);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default PofileDetails;

