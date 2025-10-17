import React, { useState } from "react";
import Filter from "../FindDoctor/filter";
import DoctorList from "../FindDoctor/doctorList";

function FindDoctor() {
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

  return (
    <div className="shadow-xl bg-gray-300 h-full p-10">
      <div className="flex justify-between border-b-2 border-black p-5">
        <h1>Find Doctor</h1>
        <div>
          <input type="text" placeholder="Search" />
          <button className="py-2 px-4 rounded-md bg-white border ml-3">Sort</button>
        </div>
      </div>

      <div className="flex">
        {/* Pass setFilteredDoctors to Filter */}
        <Filter onFilter={setFilteredDoctors} />

        {/* Pass filteredDoctors to DoctorList */}
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
}

export default FindDoctor;
