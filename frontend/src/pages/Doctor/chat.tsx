import ChatBox from "../../features/chat/chat";
import Navbar from "../../components/User/Navbar/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function Chat() {
  const doctor = useSelector((state: RootState) => state.doctor);

  if (!doctor._id)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Navbar fixed at top */}
      <div className="flex-shrink-0 w-full">
        <Navbar />
      </div>

      {/* ChatBox fills remaining space */}
      <div className="flex-1 overflow-hidden">
        <ChatBox
          chatPartnerId={doctor._id}
          chatPartnerName={doctor.firstName + " " + doctor.lastName}
          chatPartnerAvatar={doctor.imageUrl} // optional
        />
      </div>
    </div>
  );
}

export default Chat;
