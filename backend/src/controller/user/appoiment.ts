import booking from "../../models/booking/booking";

const appoiments = async (req: any, res: any) => {
  const pid = (req as any).user.id; // logged-in user id

  try {
    // Fetch only this user's bookings
    const data = await booking
      .find({ patientId: pid })
      .populate("patientId")
      .populate("doctorId");

    console.log(data, "User-specific booking data");

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json({ message: "Successful", bookings: data });
  } catch (err) {
    console.error(err, "Error fetching bookings");
    res.status(500).json({ err: "Internal server error" });
  }
};

export default appoiments;
