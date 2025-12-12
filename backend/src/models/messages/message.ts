import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  chatId: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    chatId: { type: String, required: true },
    fromUserId: { type: String, required: true },
    toUserId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
