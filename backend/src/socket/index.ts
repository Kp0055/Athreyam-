import { Server } from "socket.io";
import Message from "../models/messages/message";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", async (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      try {
        const messages = await Message.find({ chatId: roomId }).sort({ createdAt: 1 });
        socket.emit("loadMessages", messages);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    });

    socket.on("sendMessage", async (data, callback) => {
      const { chatId, fromUserId, toUserId, text } = data;

      if (!chatId || !fromUserId || !toUserId || !text) {
        console.log("Invalid message data", data);
        return callback({ status: "error", message: "Invalid data" });
      }

      try {
        const message = new Message({ chatId, fromUserId, toUserId, text });
        await message.save();
        io.to(chatId).emit("receiveMessage", message);
        callback({ status: "ok", message });
      } catch (err) {
        console.error("Error saving message:", err);
        callback({ status: "error", message: "Server error" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
