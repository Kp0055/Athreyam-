import booking from "../../models/booking/booking";
import User from "../../models/User/user";
import Transaction from "../../models/User/Transaction";
import { Request, Response } from "express";

const bookingCancel = async (req: Request, res: Response) => {
  const { bookingId } = req.body;

  try {
    // 1. Find the booking
    const appt = await booking.findById(bookingId);
    
    if (!appt) {
        res.status(404).json({ message: "Booking not found" });
        return;
    }

    if (appt.status === "cancelled") {
        res.status(400).json({ message: "Booking already cancelled" });
        return;
    }

    let updateData: any = { status: "cancelled" };

    // 2. Check if payment was made ("paid")
    console.log(`[Cancel] Checking Refund for Listing ${appt._id}: status=${appt.status}, paymentStatus=${appt.paymentStatus}, fee=${appt.fee}`);

    if (appt.paymentStatus === "paid" && appt.fee && appt.fee > 0) {
        
        // 3. Refund to Wallet
        const refundAmount = appt.fee;
        console.log(`[Cancel] Processing Refund of ${refundAmount} for User ${appt.patientId}`);
        
        // Update User Wallet
        const userUpdate = await User.findByIdAndUpdate(appt.patientId, {
            $inc: { wallet: refundAmount }
        }, { new: true });
        console.log(`[Cancel] User Wallet Updated. New Balance: ${userUpdate?.wallet}`);

        // Create Transaction Record
        const transaction = await Transaction.create({
            userId: appt.patientId,
            amount: refundAmount,
            type: "credit",
            description: `Refund for cancelled appointment with Dr. ${appt.doctorId} (Date: ${new Date(appt.date).toLocaleDateString()})`,
            bookingId: appt._id
        });
        console.log(`[Cancel] Transaction Created: ${transaction._id}`);

        // Update Booking Payment Status
        updateData.paymentStatus = "refund";
    } else {
        console.log(`[Cancel] Skipping Refund. Condition failed. PaymentStatus: ${appt.paymentStatus}, Fee: ${appt.fee}`);
    }

    // 4. Update Booking Status
    const response = await booking.findByIdAndUpdate(
        bookingId,
        updateData,
        { new: true }
    );

    res.status(200).json({ message: "Booking cancelled successfully", booking: response });
  } catch (err) {
    console.error("Booking Cancel Error:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

export default bookingCancel;
