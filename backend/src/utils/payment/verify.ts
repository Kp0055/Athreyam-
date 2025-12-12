import { Request, Response } from "express";
import crypto from "crypto";
import booking from "../../models/booking/booking";

 const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentStatus,
      bookingData, 
    } = req.body;

    // Step 1: Generate signature again
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Step 2: Compare signatures
    if (generatedSignature === razorpay_signature) {

       const pId = (req as any).user?.id;
        
         const dataBookingDetails = new booking({
        ...bookingData,
        patientId:pId,
        paymentStatus,  
        status:"scheduled"                     
      });

      await dataBookingDetails.save();


      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export default  verifyPayment;

