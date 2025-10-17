import FindDoctors from "../../components/User/FindDoctor/findDoctor"
import Navbar from "../../components/User/Navbar/navbar";
import Sidebar from "../../components/User/Sidebar/sidebar";


function searchDoctor (){
    return(
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

        <div className="container w-full mt-4 ">
          <FindDoctors/>
        </div>
         
      </div>
    </div>
    )
}

export default searchDoctor;
