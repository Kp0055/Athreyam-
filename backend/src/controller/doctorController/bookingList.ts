import booking from "../../models/booking/booking";

const bookingList = async (req: any, res: any) => {
  try {
    const docId = (req as any).user.id;

    const response = await booking.find({ doctorId: docId });

    if (!response) {
      res.status(401).json({ message: "no data found" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(401).json({ message: " internal server error" });
  }
};

export default bookingList;
