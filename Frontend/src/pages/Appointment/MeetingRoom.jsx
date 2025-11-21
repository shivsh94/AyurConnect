import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

function MeetingRoom() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { currentUser, isDoctor } = useAuth();
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMeetingDetails();
  }, [appointmentId]);

  const loadMeetingDetails = async () => {
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3030";
      const response = await axios.get(
        `${baseURL}/api/v1/user/appointments/${appointmentId}/meeting`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setMeetingData(response.data.data);
        console.log('Meeting data loaded:', response.data.data);
        // Start meeting status
        await startMeeting();
      }
    } catch (error) {
      console.error("Error loading meeting:", error);
      const errorMsg = error.response?.data?.message || "Failed to load meeting";
      
      // Provide specific error messages
      if (error.response?.status === 400) {
        setError(errorMsg);
      } else if (error.response?.status === 403) {
        setError("You don't have permission to access this meeting");
      } else if (error.response?.status === 404) {
        setError("Appointment not found");
      } else {
        setError(errorMsg);
      }
      
      toast.error(errorMsg);
      
      // Redirect after error
      setTimeout(() => {
        navigate(isDoctor ? '/doctor/appointments' : '/patient/appointments');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const startMeeting = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3030";
      await axios.post(
        `${baseURL}/api/v1/user/appointments/${appointmentId}/meeting/start`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error starting meeting:", error);
    }
  };

  const handleLeaveMeeting = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3030";
      await axios.post(
        `${baseURL}/api/v1/user/appointments/${appointmentId}/meeting/end`,
        {},
        { withCredentials: true }
      );
      toast.success("Meeting ended successfully");
      navigate(isDoctor ? '/doctor/appointments' : '/patient/appointments');
    } catch (error) {
      console.error("Error ending meeting:", error);
      toast.error("Failed to end meeting");
      navigate(isDoctor ? '/doctor/appointments' : '/patient/appointments');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading meeting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl mb-4">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => navigate(isDoctor ? '/doctor/appointments' : '/patient/appointments')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  if (!meetingData) {
    return null;
  }

  // Build Daily.co iframe embed URL
  const userName = isDoctor ? meetingData.doctorName : meetingData.patientName;
  const meetingUrl = meetingData.meetingUrl;

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-lg z-10">
        <div>
          <h1 className="text-white text-xl font-semibold">
            Consultation with {isDoctor ? meetingData.patientName : `Dr. ${meetingData.doctorName}`}
          </h1>
          <p className="text-gray-400 text-sm">
            {meetingData.appointmentTime ? new Date(meetingData.appointmentTime).toLocaleString() : 'Invalid Date'}
          </p>
        </div>
        <button
          onClick={handleLeaveMeeting}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <span>Leave Meeting</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Daily.co Meeting iframe */}
      <div className="flex-1 w-full bg-black">
        <iframe
          src={`${meetingUrl}?t=${encodeURIComponent(userName)}`}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          className="w-full h-full border-0"
          title="Video Consultation"
        />
      </div>
    </div>
  );
}

export default MeetingRoom;
