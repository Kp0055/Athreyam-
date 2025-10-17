import Navbar from "../../components/Doctor/Dashboard/Navbar"
import Sidebar from "../../components/Doctor/Dashboard/Slidebar"
import AppoimentList from "../../components/Doctor/Appoiments/appoimentList"

function appoimentsList() {
  return (
     <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p- overflow-y-auto">
          <AppoimentList />
        </div>
      </div>
    </div>
  )
}

export default appoimentsList
