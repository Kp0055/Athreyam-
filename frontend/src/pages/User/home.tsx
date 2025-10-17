import React from 'react';
import Navbar from '../../components/User/Navbar/navbar'; // Navbar component
import Feed from '../../components/User/Feeds/feedposts'; // Feed component
import Sidebar from '../../components/User/Sidebar/sidebar'; // Left Sidebar component
import Rightsidebar from '../../components/User/RightSideBar/rightsidebar'; // Right Sidebar component
import { useNotificationPermission } from '../../util/useNotificationPermission';

function Home() {
  useNotificationPermission() 
    return (
        <div className="flex flex-col min-h-screen bg-slate-100">
          {/* Header Section */}
          <header className="sticky top-0 z-50 bg-white shadow">
            <Navbar />
          </header>
    
          {/* Main Content Section */}
          <div className="container mx-auto flex justify-center">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:w-[300px] sticky top-0 h-screen overflow-hidden p-4">
              <Sidebar />
            </aside>
    
            {/* Feed Section */}
            <main className="w-full lg:w-2/3 lg:px-4 p-4 bg-white shadow-lg rounded-lg overflow-y-auto">
              <Feed />
            </main>
    
            {/* Right Sidebar */}
            <aside className="hidden lg:block lg:w-1/4 p-4">
              <Rightsidebar />
            </aside>
          </div>
        </div>
      );
}

export default Home;
