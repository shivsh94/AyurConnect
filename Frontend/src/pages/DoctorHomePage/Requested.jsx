import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function RequestedAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const doctor = useSelector((state) => state.login.currentUser);
  console.log("doc",doctor);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.post("/getAppointments",
          { doctorId: doctor._id }
        );
        if (response.data.success) {
           console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };   
    if(doctor?._id)
    fetchAppointments();
  }, [doctor]); 

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Requested Appointments</h2>

      <div className="mb-6">
        <input
          type="text"
          className="border border-yellow-200 pl-4 rounded-lg p-2 w-1/2 mb-5"
          placeholder="Search patient by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-black shadow-md rounded-lg overflow-hidden border border-yellow-300"
          >
            <div className="flex items-center p-5 bg-black">
              <img
                src={appointment.profileImage || "/default-profile.png"}  
                alt={`${appointment.patientName} profile`}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                <p className="text-sm text-gray-600">Age: {appointment.age}</p>
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
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 transition-shadow duration-300">
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
