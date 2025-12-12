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

    // --- Video Call Signaling ---
    
    socket.on("callUser", (data) => {
      const { userToCall, signalData, from, name } = data;
      // We assume the users are in the same 'chatId' room or we broadcast to the room.
      // Since userToCall isn't a socketId here but a userId, relying on the room is easiest if they are both joined.
      // However, 'data' should probably include the chatId to route it correctly.
      // If the frontend sends chatId, we can emit to that room (excluding sender).
      
      // Better approach for room-based chat: broadcast to the room.
      // The frontend must send 'chatId'.
      if (data.chatId) {
        socket.to(data.chatId).emit("callUser", { signal: signalData, from, name });
      }
    });

    socket.on("answerCall", (data) => {
      if (data.chatId) {
        socket.to(data.chatId).emit("callAccepted", data.signal);
      }
    });

    socket.on("ice-candidate", (data) => {
      if (data.chatId) {
        socket.to(data.chatId).emit("ice-candidate", data.candidate);
      }
    });
    
    socket.on("endCall", (data) => {
      if (data.chatId) {
        socket.to(data.chatId).emit("endCall");
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      // Optional: notify others in the room/s that user disconnected
    });
  });
};
