import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  type: "credit" | "debit";
  description: string;
  date: Date;
  bookingId?: mongoose.Schema.Types.ObjectId;
}

const transactionSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" }
});

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
