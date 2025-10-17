import React from "react";
import DashNavbar from "../../components/Doctor/Dashboard/Navbar";
import Graphcard from "../../components/Doctor/Dashboard/Cards";
import Charts from "../../components/Doctor/Dashboard/linearchart";
import DoughnutChart from "../../components/Doctor/Dashboard/dougnutChart ";
import Slidebar from "../../components/Doctor/Dashboard/Slidebar";
import { useNotificationPermission } from "../../util/useNotificationPermission";


function Dashboard() {
  useNotificationPermission()

  return (
    <div className="bg-blue-200 min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <DashNavbar />
      </div>

      {/* Layout: Sidebar + Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Slidebar />

        {/* Main Content */}
        <div className="flex-1 ">
          <Graphcard />
          <div className="flex flex-wrap ">
            <Charts />
            <div className="ml-5">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
