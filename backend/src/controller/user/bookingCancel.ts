import booking from "../../models/booking/booking";

const bookingCancel = async (req: any, res: any) => {
  const { bookingId } = req.body;

  try {
    const response = await booking
      .findOneAndUpdate({ _id: bookingId })
      .updateOne({
        status: "cancelled",
      });
    await res.json(response);
  } catch (err) {
    res.status(500).json({ err: "internal server" });
  }
};

export default bookingCancel;
