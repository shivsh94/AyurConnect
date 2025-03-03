import React from "react";

function PatientList() {
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      appointmentDate: "2024-10-12",
      appointmentTime: "10:30 AM",
      status: "Approved",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder profile image
    },
    {
      id: 2,
      patientName: "Jane Smith",
      appointmentDate: "2024-10-13",
      appointmentTime: "1:00 PM",
      status: "Approved",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg", // Placeholder profile image
    },
    {
      id: 3,
      patientName: "Michael Johnson",
      appointmentDate: "2024-10-14",
      appointmentTime: "3:00 PM",
      status: "Approved",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg", // Placeholder profile image
    },
    {
      id: 4,
      patientName: "Michael Johnson",
      appointmentDate: "2024-10-14",
      appointmentTime: "3:00 PM",
      status: "Approved",
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg", // Placeholder profile image
    },
    {
      id: 5,
      patientName: "Michael Johnson",
      appointmentDate: "2024-10-14",
      appointmentTime: "3:00 PM",
      status: "Approved",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg", // Placeholder profile image
    },
  ];

  // Filter approved appointments
  const approvedAppointments = appointments.filter(
    (appointment) => appointment.status === "Approved"
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Approved Appointments (Patient List)
      </h2>

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {approvedAppointments.length > 0 ? (
          approvedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-black border border-yellow-200 rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Patient Profile Image */}
              <img
                src={appointment.profileImage}
                alt={`${appointment.patientName}'s profile`}
                className="w-16 h-16 rounded-full object-cover"
              />

              {/* Appointment Details */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {appointment.patientName}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Date:</span>{" "}
                  {appointment.appointmentDate}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Time:</span>{" "}
                  {appointment.appointmentTime}
                </p>
                <p className="text-green-600 font-semibold">
                  <span className="font-medium">Status:</span>{" "}
                  {appointment.status}
                </p>
                
              </div>
            </div>
          ))
        ) : (
          <p>No approved appointments.</p>
        )}
      </div>
    </div>
  );
}

export default PatientList;
