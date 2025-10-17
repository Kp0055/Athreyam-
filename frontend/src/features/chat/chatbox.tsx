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

interface ChatBoxProps {
  chatPartnerId: string;
  chatPartnerName: string;
  chatPartnerAvatar?: string;
}

let socket: Socket;

const ChatBox: React.FC<ChatBoxProps> = ({
  chatPartnerId,
  chatPartnerName,
  chatPartnerAvatar,
}) => {
  const profile = useSelector((state: RootState) => state.profile);
  const doctor = useSelector((state: RootState) => state.doctor);
  const currentUserId = profile._id || doctor._id;

  const chatId = [currentUserId, chatPartnerId].sort().join("_");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket = io("http://localhost:5000");

    if (currentUserId && chatPartnerId) {
      socket.emit("joinRoom", chatId);

      socket.on("loadMessages", (prevMessages: IMessage[]) => {
        setMessages(prevMessages);
      });

      socket.on("receiveMessage", (msg: IMessage) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [chatId, currentUserId, chatPartnerId]);

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

    socket.emit(
      "sendMessage",
      msgData,
      (response: { status: string; message?: IMessage }) => {
        if (response.status === "ok" && response.message) {
          setMessages((prev) => [...prev, response.message!]);
        }
      }
    );

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 bg-green-500 text-white shadow-md">
        {chatPartnerAvatar && (
          <img
            src={chatPartnerAvatar}
            alt={chatPartnerName}
            className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-white"
          />
        )}
        <h3 className="font-semibold">{chatPartnerName}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-end ${
              msg.fromUserId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative max-w-xs sm:max-w-md px-4 py-2 rounded-xl break-words ${
                msg.fromUserId === currentUserId
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <span>{msg.text}</span>
              <div className="text-xs text-gray-400 absolute bottom-0 right-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-3 bg-gray-200 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

