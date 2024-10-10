import React, { useState } from "react";

// Sample data for patient history with profile images
const patientData = [
  {
    id: 1,
    name: "John Doe",
    appointmentDate: "2024-09-15",
    notes: "Follow-up for hypertension.",
    medications: "Lisinopril 10mg",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", // Example image URL
  },
  {
    id: 2,
    name: "Jane Smith",
    appointmentDate: "2024-09-20",
    notes: "Routine check-up.",
    medications: "None",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg", // Example image URL
  },
  {
    id: 3,
    name: "Alice Johnson",
    appointmentDate: "2024-09-25",
    notes: "Flu symptoms, prescribed Tamiflu.",
    medications: "Tamiflu 75mg",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg", // Example image URL
  },
  {
    id: 4,
    name: "Alice Johnson",
    appointmentDate: "2024-09-25",
    notes: "Flu symptoms, prescribed Tamiflu.",
    medications: "Tamiflu 75mg",
    profileImage: "https://randomuser.me/api/portraits/women/6.jpg", // Example image URL
  },
];

function PatientHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the patient data based on the search term
  const filteredPatients = patientData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-4">Patient History</h2>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          className="border border-yellow-200 pl-4 rounded-lg p-2 w-1/2  mb-5"
          placeholder="Search patient by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient History Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-black p-4 rounded-lg shadow-lg border border-yellow-300 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Profile Image */}
              <div className="flex items-center mb-4">
                <img
                  src={patient.profileImage}
                  alt={patient.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <h3 className="text-xl font-semibold">{patient.name}</h3>
              </div>

              {/* Appointment Date */}
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Appointment Date:</span>{" "}
                {patient.appointmentDate}
              </p>

              {/* Notes */}
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Notes:</span> {patient.notes}
              </p>

              {/* Medications */}
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Medications:</span>{" "}
                {patient.medications}
              </p>
            </div>
          ))
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
}

export default PatientHistory;



