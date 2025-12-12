import booking from "../../models/booking/booking";

const dashboardCount = async (req: any, res: any) => {
  try {

    const doctorId = (req as any).user.id;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID not found in request" });
    }
    // Fetch counts from the database
    const scheduledCount = await booking.countDocuments({ doctorId: doctorId, status: "scheduled" });
    const cancelledCount = await booking.countDocuments({ doctorId: doctorId, status: "cancelled" });
    const totalPatientsCount = await booking.distinct("patientId", { doctorId: doctorId }).then(patientId => patientId.length);
    // Send the counts as a response
    res.status(200).json({
      scheduled: scheduledCount,
      cancelled: cancelledCount,
      totalPatients: totalPatientsCount,
    });

    } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default dashboardCount;