import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Card, Header } from "../../Components";
import { formatDateTime, getStatusColor } from "../../utils/helpers";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const currentUser = useSelector((state) => state.login.currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === "all") return true;
    return appointment.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Header
          title="Patient Appointment Requests"
          subtitle="Manage your patient appointment requests"
          variant="gradient"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-600">{appointments.length}</div>
            <div className="text-gray-600">Total Requests</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-gray-600">Pending</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'confirmed').length}
            </div>
            <div className="text-gray-600">Confirmed</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {appointments.filter(a => a.status === 'cancelled').length}
            </div>
            <div className="text-gray-600">Cancelled</div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 border-b border-gray-200">
            {[
              { key: "all", label: "All", count: appointments.length },
              { key: "pending", label: "Pending", count: appointments.filter(a => a.status === 'pending').length },
              { key: "confirmed", label: "Confirmed", count: appointments.filter(a => a.status === 'confirmed').length },
              { key: "cancelled", label: "Cancelled", count: appointments.filter(a => a.status === 'cancelled').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointment Requests</h3>
            <p className="text-gray-500 mb-6">
              {filter === "all" 
                ? "You don't have any appointment requests yet."
                : `No ${filter} appointment requests found.`
              }
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredAppointments.map((appointment, index) => (
              <Card key={appointment._id || index} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.patientName}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1">
                        {appointment.speciality} • {appointment.clinic}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        Appointment Type: {appointment.type}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Date & Time:</span>
                          <p className="text-gray-600">
                            {formatDateTime(appointment.appointmentTime)}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Patient Contact:</span>
                          <p className="text-gray-600">
                            {appointment.patientPhone}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {appointment.patientEmail}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Patient Info:</span>
                          <p className="text-gray-600">
                            Age: {appointment.patientAge} • {appointment.patientGender}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => {
                      // View details functionality
                      toast.info("View details feature coming soon!");
                    }}
                  >
                    View Details
                  </Button>
                  
                  {appointment.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        size="small"
                        onClick={() => handleAcceptAppointment(appointment._id)}
                      >
                        Accept Request
                      </Button>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleDeclineAppointment(appointment._id)}
                      >
                        Decline Request
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <Button
                      size="small"
                      onClick={() => {
                        // Join meeting functionality
                        toast.info("Join meeting feature coming soon!");
                      }}
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
    </div>
  );
}

export default DoctorAppointments; 