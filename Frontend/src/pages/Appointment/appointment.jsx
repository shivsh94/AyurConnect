import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Card, Input, Modal } from "../../Components";

const AppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.currentUser);
  
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    doctorId: doctorId,
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingDoctor, setFetchingDoctor] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/v1/user/public/doctors`);
        if (response.data.success) {
          const foundDoctor = response.data.data.find(doc => doc._id === doctorId);
          if (foundDoctor) {
            setDoctor(foundDoctor);
          } else {
            toast.error("Doctor not found");
            navigate("/patient/dashboard");
          }
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast.error("Error fetching doctor details");
      } finally {
        setFetchingDoctor(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.appointmentDate || !formData.appointmentTime) {
      toast.error("Please select date and time");
      return;
    }

    if (!formData.reason.trim()) {
      toast.error("Please provide a reason for the appointment");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/v1/user/createAppointment", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      if (response.data.success) {
        toast.success("Appointment booked successfully!");
        setShowSuccessModal(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to book appointment";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();
    const selectedDate = formData.appointmentDate ? new Date(formData.appointmentDate) : today;
    
    // Only show future dates
    if (selectedDate < today && selectedDate.toDateString() === today.toDateString()) {
      return slots;
    }

    let startTime = new Date(selectedDate);
    startTime.setHours(9, 0, 0, 0); // Start at 9 AM
    let endTime = new Date(selectedDate);
    endTime.setHours(17, 0, 0, 0); // End at 5 PM

    while (startTime < endTime) {
      const timeString = startTime.toLocaleTimeString([], {   
        hour: "2-digit",
        minute: "2-digit",
      });
      slots.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 30); // 30-minute slots
    }
    return slots;
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, appointmentDate: e.target.value, appointmentTime: "" });
    setSelectedSlot(null);
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, appointmentTime: time });
    setSelectedSlot(time);
  };

  if (fetchingDoctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">Doctor not found</p>
          <Button onClick={() => navigate("/patient/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/patient/dashboard")}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Information */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="text-center text-black">
                <img
                  src={doctor.image || "https://via.placeholder.com/120x120?text=Dr"}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full border-2 border-gray-500 object-cover mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Dr. {doctor.name}
                </h2>
                <p className="text-blue-600 font-medium mb-4">{doctor.speciality}</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{doctor.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clinic:</span>
                    <span className="font-medium">{doctor.clinic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">License:</span>
                    <span className="font-medium">{doctor.licence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium text-sm">{doctor.address}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Appointment Form */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Schedule Your Appointment</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block  text-sm font-medium text-gray-700 mb-2">
                    Appointment Date
                  </label>
                  <Input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleDateChange}
                    min={getMinDate()}
                    required
                    className="text-black"
                  />
                </div>

                {/* Time Selection */}
                {formData.appointmentDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Time
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {generateTimeSlots().map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleTimeSelect(slot)}
                          className={`p-3 text-sm rounded-lg border transition-colors ${
                            selectedSlot === slot
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {generateTimeSlots().length === 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        No available slots for today. Please select a future date.
                      </p>
                    )}
                  </div>
                )}

                {/* Reason for Visit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={4}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your symptoms or reason for the appointment..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !formData.appointmentDate || !formData.appointmentTime || !formData.reason.trim()}
                  className="w-full"
                >
                  {loading ? "Booking Appointment..." : "Book Appointment"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/patient/appointments");
        }}
        title="Appointment Booked Successfully!"
        size="small"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">
            Your appointment with Dr. {doctor.name} has been successfully booked.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Date: {formData.appointmentDate}<br />
            Time: {formData.appointmentTime}
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/patient/appointments");
              }}
              className="flex-1"
            >
              View My Appointments
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/patient/dashboard");
              }}
              className="flex-1"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentPage;
