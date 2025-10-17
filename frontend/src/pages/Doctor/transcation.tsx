import React from 'react'
import Navbar from '../../components/Doctor/Dashboard/Navbar'
import Sidebar from '../../components/Doctor/Dashboard/Slidebar'
import PaymentTransaction from '../../components/Doctor/Appoiments/PaymentTransaction'

function transcation() {
  return (
        <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p- overflow-y-auto">
          <PaymentTransaction />
        </div>
      </div>
    </div>
  )
}

export default transcation
