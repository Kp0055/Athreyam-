import mongoose, { Schema, Document } from "mongoose";

interface Comment {
  content: string;
  username: string;
  createdAt: Date;
}

export interface IPost extends Document {
  doctorId: string;
  docName: string;
  content: string;
  image?: string;
  likes: string[];
  savedBy: string[];
  comments: Comment[];
}

const PostSchema = new Schema<IPost>(
  {
    doctorId: { type: String, required: true },
    docName: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        content: { type: String, required: true },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
