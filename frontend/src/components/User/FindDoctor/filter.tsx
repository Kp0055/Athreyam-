import React, { useState } from "react";

type Props = {
  onFilter: (doctors: any[]) => void;
};

export default function MultiFilter({ onFilter }: Props) {
  // States for each filter group
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedConsultations, setSelectedConsultations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Options for each filter
  const gender = ["male", "female"];
  const availability = ["Morning", "Afternoon", "Evening"];
  const specialities = [
    "Psychiatry ",
    "Psychology",
    "Psychotherapy",
    "Neurologist",
    "Child Counsellor",
    "Mental Psychology",
  ];
  const experience = ["0-5 years", "5-10 years", "10+ years"];
  const consultation = ["Video", "Chat", "Clinic"];
  const languages = ["English", "Spanish", "French", "Malayalam", "Hindi", "Tamil"];

  // Toggle helper for checkbox selection
  const toggleOption = (
    value: string,
    selectedArray: string[],
    setSelectedArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((v) => v !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  // Reset all filters
  const resetAll = () => {
    setSelectedGenders([]);
    setSelectedAvailability([]);
    setSelectedSpecialities([]);
    setSelectedExperience([]);
    setSelectedConsultations([]);
    setSelectedLanguages([]);
    // Also optionally notify parent about reset with empty array:
    onFilter([]);
  };

  // Apply button handler — send to backend
  const applyFilters = async () => {
    const filters = {
      gender: selectedGenders,
      availability: selectedAvailability,
      specialities: selectedSpecialities,
      experience: selectedExperience,
      consultation: selectedConsultations,
      languages: selectedLanguages,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/filters", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error("Failed to apply filters");
      }

      const result = await response.json();
      console.log("Filtered data from backend:", result);

      // Assuming your backend sends filtered doctors as `result.data` or `result.response`:
      onFilter(result.data || result.response || []);

    } catch (error) {
      console.error("Error applying filters:", error);
      alert("Something went wrong while applying filters.");
    }
  };

  // Render checkbox list helper
  const renderCheckboxList = (
    options: string[],
    selectedOptions: string[],
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>
  ) =>
    options.map((option) => (
      <label
        key={option}
        className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
      >
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-600"
          checked={selectedOptions.includes(option)}
          onChange={() => toggleOption(option, selectedOptions, setSelectedOptions)}
        />
        <span className="ml-2 text-gray-700">{option}</span>
      </label>
    ));

  return (
    <div className="bg-white rounded shadow-lg p-6 w-[250px] max-h-[90vh] overflow-y-auto flex flex-col">
      {/* Filter sections */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Gender</h3>
        <div className="flex flex-col space-y-1">
          {renderCheckboxList(gender, selectedGenders, setSelectedGenders)}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Availability</h3>
        <div className="flex flex-col space-y-1">
          {renderCheckboxList(availability, selectedAvailability, setSelectedAvailability)}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Speciality</h3>
        <div className="flex flex-col space-y-1">
          {renderCheckboxList(specialities, selectedSpecialities, setSelectedSpecialities)}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        <div className="flex flex-col space-y-1">
          {renderCheckboxList(experience, selectedExperience, setSelectedExperience)}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Consultation</h3>
        <div className="flex flex-col space-y-1">
          {renderCheckboxList(consultation, selectedConsultations, setSelectedConsultations)}
        </div>
      </div>

      <div className="mb-6 flex-grow overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Languages</h3>
        <div className="flex flex-col space-y-1">
          {renderCheckboxList(languages, selectedLanguages, setSelectedLanguages)}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-auto pt-4 border-t">
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Apply
        </button>

        <button
          onClick={resetAll}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
