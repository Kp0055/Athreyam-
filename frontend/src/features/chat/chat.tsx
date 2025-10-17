import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IMessage {
  _id: string;
  chatId: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  createdAt: string;
}

interface ChatProps {
  chatPartnerId: string;
  chatPartnerName: string;
  chatPartnerAvatar?: string;
}

let socket: Socket;

const Chat: React.FC<ChatProps> = ({ chatPartnerId, chatPartnerName, chatPartnerAvatar }) => {
  const profileinfo = useSelector((state: RootState) => state.profile);
  const currentUserId = profileinfo._id;
  const chatId = [currentUserId, chatPartnerId].sort().join("_");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Connect to socket and join room
  useEffect(() => {
    if (!currentUserId || !chatPartnerId) return;

    socket = io("http://localhost:5000");
    socket.emit("joinRoom", chatId);

    socket.on("loadMessages", (prevMessages: IMessage[]) => {
      setMessages(prevMessages);
    });

    socket.on("receiveMessage", (msg: IMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId, currentUserId, chatPartnerId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      chatId,
      fromUserId: currentUserId,
      toUserId: chatPartnerId,
      text: message.trim(),
    };

    socket.emit("sendMessage", msgData, (response: { status: string; message?: IMessage }) => {
      if (response.status === "ok" && response.message) {
        setMessages((prev) => [...prev, response.message!]);
      } else {
        console.error("Message failed:", response);
      }
    });

    setMessage("");
  };

  if (!currentUserId) return <div>Loading user info...</div>;

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b shadow-md">
        {chatPartnerAvatar && (
          <img src={chatPartnerAvatar} alt={chatPartnerName} className="w-10 h-10 rounded-full mr-2" />
        )}
        <span className="font-semibold">{chatPartnerName}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2">
        {messages.map((msg) => {
          const isSender = msg.fromUserId === currentUserId;
          return (
            <div
              key={msg._id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              {!isSender && chatPartnerAvatar && (
                <img
                  src={chatPartnerAvatar}
                  alt={chatPartnerName}
                  className="w-6 h-6 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 rounded-lg max-w-xs break-words text-sm ${
                  isSender ? "bg-green-200" : "bg-blue-200"
                }`}
              >
                {msg.text}
                <div className="text-xs text-gray-500 text-right mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-2 bg-white border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
