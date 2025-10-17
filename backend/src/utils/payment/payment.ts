import Razorpay from "razorpay";
import { Request, Response } from "express";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// ✅ Create an order
 const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;

    console.log(amount,'pepepepepe')

    const options = {
      amount: amount * 100, // amount in paise (₹500 => 50000)
      currency: "INR",
      receipt: "receipt_order_" + new Date().getTime(),
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default createOrder;

