import ChatBox from "../../features/chat/chat";
import Navbar from "../../components/User/Navbar/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function Chat() {
  const userProfile = useSelector((state: RootState) => state.doctor);

  if (!userProfile._id)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Navbar fixed at top */}
      <div className="w-full flex-shrink-0">
        <Navbar />
      </div>

      {/* ChatBox fills remaining height */}
      <div className="flex-1 flex flex-col">
        <ChatBox
          chatPartnerId={userProfile._id}
          chatPartnerName={userProfile.firstName + " " + userProfile.lastName} // optional
        />
      </div>
    </div>
  );
}

export default Chat;
