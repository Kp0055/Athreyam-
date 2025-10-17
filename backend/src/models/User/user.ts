import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email: string;
  gender?: string;
  wallet?: number;
  dob?: Date;
  password?: string;
  googleId?: string;
  role?: "user";
  following: string[]; // <-- array of user IDs
}

const userSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  wallet: { type: Number },
  dob: { type: Date },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  role: { type: String, default: "user", enum: ["user"] },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model<IUser>("User", userSchema);
