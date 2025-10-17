import Navbar from "../../components/Doctor/Dashboard/Navbar";
import Sidebar from "../../components/Doctor/Dashboard/Slidebar";

import Feed from "../../components/Doctor/Feed/feed";

function feedPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p- overflow-y-auto">
          <Feed />
        </div>
      </div>
    </div>
  );
}

export default feedPage;
