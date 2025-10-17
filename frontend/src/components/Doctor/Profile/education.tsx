import React, { useState, useEffect } from "react";

interface EducationItem {
  _id?: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

const Education: React.FC = () => {
  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEdu, setNewEdu] = useState<EducationItem>({
    degree: "",
    institution: "",
    year: "",
    description: "",
  });

  // Load education entries on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/doctor/education", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'education fetch');
        if (Array.isArray(data)) {
          setEducationList(data);
        } else if (Array.isArray(data.education)) {
          setEducationList(data.education);
        } else {
          console.error("Unexpected education format:", data);
          setEducationList([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch education", err);
        setEducationList([]);
      });
  }, []);

  // Save new education entry
  const handleAddEducation = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/doctor/education", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEdu),
      });

      if (!res.ok) throw new Error("Failed to save education entry");

      const savedEdu = await res.json();

      setEducationList((prev) => [...prev, savedEdu]);
      setNewEdu({ degree: "", institution: "", year: "", description: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Education
        </button>
      </div>

      <ul className="space-y-4">
        {Array.isArray(educationList) && educationList.map((edu, index) => (
          <li key={edu._id || index} className="border-b pb-4">
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p className="text-sm text-gray-600">
              {edu.institution} — <span className="italic">{edu.year}</span>
            </p>
            {edu.description && (
              <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
            )}
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Add Education</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Degree"
                value={newEdu.degree}
                onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Institution"
                value={newEdu.institution}
                onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Year"
                value={newEdu.year}
                onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description (optional)"
                value={newEdu.description}
                onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEducation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
