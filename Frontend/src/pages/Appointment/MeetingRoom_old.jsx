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
        // Start meeting status
        await startMeeting();
      }
    } catch (error) {
      console.error("Error loading meeting:", error);
      const errorMsg = error.response?.data?.message || "Failed to load meeting";
      setError(errorMsg);
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

  const endMeeting = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3030";
      await axios.post(
        `${baseURL}/api/v1/user/appointments/${appointmentId}/meeting/end`,
        {},
        { withCredentials: true }
      );
      toast.success("Meeting ended successfully");
    } catch (error) {
      console.error("Error ending meeting:", error);
      toast.error("Failed to end meeting");
    }
  };

  useEffect(() => {
    if (meetingData && jitsiContainerRef.current) {
      initializeJitsi();
    }

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [meetingData]);

  const initializeJitsi = () => {
    // Clear the container first
    if (jitsiContainerRef.current) {
      jitsiContainerRef.current.innerHTML = '';
    }

    // Check if Jitsi API is available
    if (typeof window.JitsiMeetExternalAPI !== 'undefined') {
      console.log('Jitsi External API is available');
      createJitsiMeeting();
    } else {
      console.log('Waiting for Jitsi External API to load...');
      // Wait a bit and try again
      const checkInterval = setInterval(() => {
        if (typeof window.JitsiMeetExternalAPI !== 'undefined') {
          console.log('Jitsi External API loaded');
          clearInterval(checkInterval);
          createJitsiMeeting();
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (typeof window.JitsiMeetExternalAPI === 'undefined') {
          console.error('Jitsi External API failed to load');
          toast.error('Failed to load video conferencing. Please refresh.');
          setError('Failed to load video conferencing library');
        }
      }, 10000);
    }
  };

  const createJitsiMeeting = () => {
    try {
      console.log('Creating Jitsi meeting with ID:', meetingData.meetingId);
      
      if (!jitsiContainerRef.current) {
        console.error('Container ref not available');
        return;
      }

      const domain = 'meet.jit.si';
      const options = {
        roomName: meetingData.meetingId,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: isDoctor ? meetingData.doctorName : meetingData.patientName,
          email: currentUser?.email || ''
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone',
            'camera',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            'hangup',
            'profile',
            'chat',
            'recording',
            'livestreaming',
            'etherpad',
            'sharedvideo',
            'settings',
            'raisehand',
            'videoquality',
            'filmstrip',
            'invite',
            'feedback',
            'stats',
            'shortcuts',
            'tileview',
            'download',
            'help',
            'mute-everyone',
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
      };

      console.log('Initializing Jitsi with options:', options);
      const api = new window.JitsiMeetExternalAPI(domain, options);
      jitsiApiRef.current = api;

      // Event listeners
      api.addEventListener('videoConferenceJoined', () => {
        console.log('User joined the meeting');
        toast.success('Joined meeting successfully');
      });

      api.addEventListener('videoConferenceLeft', async () => {
        console.log('User left the meeting');
        await endMeeting();
        navigate(isDoctor ? '/doctor/appointments' : '/patient/appointments');
      });

      api.addEventListener('readyToClose', () => {
        api.dispose();
        navigate(isDoctor ? '/doctor/appointments' : '/patient/appointments');
      });

      console.log('Jitsi meeting initialized successfully');
    } catch (error) {
      console.error('Error creating Jitsi meeting:', error);
      toast.error('Failed to initialize video conference');
      setError('Failed to initialize video conference');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading meeting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Join Meeting</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(isDoctor ? '/doctor/appointments' : '/patient/appointments')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Meeting Header */}
      <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {isDoctor ? `Consultation with ${meetingData?.patientName}` : `Consultation with Dr. ${meetingData?.doctorName}`}
          </h1>
          <p className="text-sm text-gray-400">
            {new Date(meetingData?.appointmentTime).toLocaleString()}
          </p>
        </div>
        <button
          onClick={async () => {
            if (jitsiApiRef.current) {
              jitsiApiRef.current.executeCommand('hangup');
            }
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <span>Leave Meeting</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Jitsi Meeting Container */}
      <div 
        ref={jitsiContainerRef} 
        style={{ height: 'calc(100vh - 64px)', width: '100%' }}
      />
    </div>
  );
}

export default MeetingRoom;
