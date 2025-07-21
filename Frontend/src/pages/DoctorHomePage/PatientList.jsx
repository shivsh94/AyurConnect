import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Card } from "../../Components";
import { formatDateTime, getStatusColor } from "../../utils/helpers";

function PatientList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Filter confirmed appointments
  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Confirmed Appointments (Patient List)
      </h2>

      {/* Patient List */}
      {confirmedAppointments.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Confirmed Appointments</h3>
          <p className="text-gray-500">You don't have any confirmed appointments yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {confirmedAppointments.map((appointment) => (
            <Card key={appointment._id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                {/* Patient Profile Image */}
                <img
                  src={appointment.profileImage || "https://via.placeholder.com/64x64?text=Patient"}
                  alt={`${appointment.patientName}'s profile`}
                  className="w-16 h-16 rounded-full object-cover"
                />

                {/* Appointment Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {appointment.patientName}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Date & Time:</span>{" "}
                    {formatDateTime(appointment.appointmentTime)}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Contact:</span>{" "}
                    {appointment.patientPhone}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Age:</span> {appointment.patientAge} • {appointment.patientGender}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientList;
