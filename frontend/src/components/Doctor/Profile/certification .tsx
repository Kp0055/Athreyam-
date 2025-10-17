import React, { useState, useEffect } from "react";

interface CertificationItem {
  _id?: string;
  title: string;
  organization: string;
  date: string;
  credentialUrl?: string;
}

const Certification: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCert, setNewCert] = useState<CertificationItem>({
    title: "",
    organization: "",
    date: "",
    credentialUrl: "",
  });

  // Load certifications on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/doctor/certifications", {
      credentials: "include", // Important if using cookies/auth
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,'boombang')
        // Handle array or object response safely
        if (Array.isArray(data)) {
          setCertifications(data);
        } else if (Array.isArray(data.certifications)) {
          setCertifications(data.certifications);
        } else {
          console.error("Unexpected certifications format:", data);
          setCertifications([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch certifications", err);
        setCertifications([]);
      });
  }, []);

  // Save new certification
  const handleAddCertification = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/doctor/certifications", {
        method: "POST",
        credentials: "include", // Important for sessions/auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCert),
      });

      if (!res.ok) throw new Error("Failed to save certification");

      const savedCert = await res.json();

      // Append new cert
      setCertifications((prev) => [...prev, savedCert]);

      // Reset form
      setNewCert({ title: "", organization: "", date: "", credentialUrl: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving certification:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Certification
        </button>
      </div>

      <ul className="space-y-4">
        {Array.isArray(certifications) && certifications.map((cert, index) => (
          <li key={cert._id || index} className="border-b pb-4">
            <h3 className="text-lg font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-600">
              {cert.organization} — <span className="italic">{cert.date}</span>
            </p>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Credential
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Add Certification</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newCert.title}
                onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Organization"
                value={newCert.organization}
                onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="date"
                value={newCert.date}
                onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="url"
                placeholder="Credential URL (optional)"
                value={newCert.credentialUrl}
                onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
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
                onClick={handleAddCertification}
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

export default Certification;
