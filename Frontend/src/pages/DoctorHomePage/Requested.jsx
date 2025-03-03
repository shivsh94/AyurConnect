import React, { useState } from "react";

// Sample profile image URLs for patients
const patientProfiles = {
  1: "https://randomuser.me/api/portraits/men/10.jpg",
  2: "https://randomuser.me/api/portraits/men/20.jpg",
  3: "https://randomuser.me/api/portraits/men/30.jpg",
  4: "https://randomuser.me/api/portraits/men/4.jpg",
  5: "https://randomuser.me/api/portraits/men/5.jpg",
};

function RequestedAppointments() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const appointments = [
    {
      id: 1,
      patientName: "hey",
      age: 25, // Added age
      problem: "Fever", // Added problem
      appointmentDate: "2024-10-12",
      appointmentTime: "10:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "hy",
      age: 30, // Added age
      problem: "Headache", // Added problem
      appointmentDate: "2024-10-13",
      appointmentTime: "1:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      patientName: "hello",
      age: 28, // Added age
      problem: "Back Pain", // Added problem
      appointmentDate: "2024-10-14",
      appointmentTime: "3:00 PM",
      status: "Pending",
    },
    {
      id: 4,
      patientName: "goodbye",
      age: 35, // Added age
      problem: "Check-up", // Added problem
      appointmentDate: "2024-10-15",
      appointmentTime: "1:00 PM",
      status: "Pending",
    },
    {
      id: 5,
      patientName: "hi",
      age: 22, // Added age
      problem: "Cough", // Added problem
      appointmentDate: "2024-10-16",
      appointmentTime: "11:00 AM",
      status: "Pending",
    },
  ];

  // Filter the appointments based on the search term
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Requested Appointments</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="border border-yellow-200 pl-4 rounded-lg p-2 w-1/2 mb-5"
          placeholder="Search patient by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-black shadow-md rounded-lg overflow-hidden border border-yellow-300"
          >
            {/* Profile Section */}
            <div className="flex items-center p-5 bg-black">
              <img
                src={patientProfiles[appointment.id]}
                alt={`${appointment.patientName} profile`}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                <p className="text-sm text-gray-600">Age: {appointment.age}</p> {/* Added age */}
                <p className="text-sm text-gray-600">Problem: {appointment.problem}</p> {/* Added problem */}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-1">
                {appointment.appointmentDate} at {appointment.appointmentTime}
              </p>
              <p
                className={`text-sm font-medium mb-4 ${
                  appointment.status === "Pending"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {appointment.status}
              </p>

              <div className="flex justify-between gap-2">
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 transition-shadow duration-300 ">
                  Approve
                </button>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-shadow duration-300">
                  Reschedule
                </button>
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition-shadow duration-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestedAppointments;
