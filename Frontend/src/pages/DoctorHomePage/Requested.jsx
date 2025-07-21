import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Button, Card } from "../../Components";
import { formatDateTime, getStatusColor } from "../../utils/helpers";

function RequestedAppointments() {
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

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(`/api/v1/user/appointments/${appointmentId}/accept`);
      if (response.data.success) {
        toast.success("Appointment accepted successfully");
        fetchAppointments(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to accept appointment");
      }
    } catch (error) {
      console.error("Error accepting appointment:", error);
      toast.error("Failed to accept appointment");
    }
  };

  const handleDeclineAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to decline this appointment?")) {
      return;
    }

    try {
      const response = await axios.put(`/api/v1/user/appointments/${appointmentId}/decline`);
      if (response.data.success) {
        toast.success("Appointment declined successfully");
        fetchAppointments(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to decline appointment");
      }
    } catch (error) {
      console.error("Error declining appointment:", error);
      toast.error("Failed to decline appointment");
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-gray-900">Requested Appointments</h2>

      <div className="mb-6">
        <input
          type="text"
          className="border border-gray-300 pl-4 rounded-lg p-2 w-full md:w-1/2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search patient by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointment Requests</h3>
          <p className="text-gray-500">
            {searchTerm ? `No appointments found for "${searchTerm}"` : "You don't have any appointment requests yet."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment._id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center p-4 border-b border-gray-200">
                <img
                  src={appointment.profileImage || "https://via.placeholder.com/64x64?text=Patient"}
                  alt={`${appointment.patientName} profile`}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-600">Age: {appointment.patientAge}</p>
                  <p className="text-sm text-gray-600">Gender: {appointment.patientGender}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Date & Time:</span> {formatDateTime(appointment.appointmentTime)}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Contact:</span> {appointment.patientPhone}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Email:</span> {appointment.patientEmail}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>

                {appointment.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="small"
                      onClick={() => handleAcceptAppointment(appointment._id)}
                      className="flex-1"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDeclineAppointment(appointment._id)}
                      className="flex-1"
                    >
                      Decline
                    </Button>
                  </div>
                )}

                {appointment.status === 'confirmed' && (
                  <Button
                    size="small"
                    onClick={() => {
                      toast.info("Start consultation feature coming soon!");
                    }}
                    className="w-full"
                  >
                    Start Consultation
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestedAppointments;
