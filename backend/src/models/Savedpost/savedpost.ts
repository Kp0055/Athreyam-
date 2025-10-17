// models/AppUser.ts

import mongoose, { Document, Schema, Model } from "mongoose";

// Define interface
export interface IAppUser extends Document {
  username: string;
  savedPosts: mongoose.Types.ObjectId[];
}

// Define schema
const appUserSchema: Schema<IAppUser> = new Schema({
  username: { type: String, required: true },
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

// Create and export model
const AppUser: Model<IAppUser> = mongoose.model<IAppUser>("AppUser", appUserSchema);

export default AppUser;
