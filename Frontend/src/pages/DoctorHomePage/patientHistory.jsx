import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Card } from "../../Components";
import { formatDateTime } from "../../utils/helpers";

function PatientHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const doctor = useSelector((state) => state.login.currentUser);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/v1/user/getDoctorAppointments");
      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to load appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // Filter completed appointments (for now, we'll show all appointments as history)
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed" || appointment.status === "completed"
  );

  // Filter the patient data based on the search term
  const filteredPatients = completedAppointments.filter((patient) =>
    patient.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patient history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Patient History</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="border border-gray-300 pl-4 rounded-lg p-2 w-full md:w-1/2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search patient by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient History Cards */}
      {filteredPatients.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Patient History</h3>
          <p className="text-gray-500">
            {searchTerm ? `No patients found for "${searchTerm}"` : "You don't have any patient history yet."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient._id} className="hover:shadow-lg transition-shadow">
              {/* Profile Image and Name */}
              <div className="flex items-center mb-4">
                <img
                  src={patient.profileImage || "https://via.placeholder.com/64x64?text=Patient"}
                  alt={patient.patientName}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{patient.patientName}</h3>
                  <p className="text-sm text-gray-600">Age: {patient.patientAge} • {patient.patientGender}</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Appointment Date:</span>{" "}
                  {formatDateTime(patient.appointmentTime)}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Contact:</span>{" "}
                  {patient.patientPhone}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {patient.patientEmail}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    patient.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {patient.status}
                  </span>
                </p>

                {/* Placeholder for future features */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-500 text-sm italic">
                    Notes and medications will be available after consultation features are implemented.
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientHistory;



