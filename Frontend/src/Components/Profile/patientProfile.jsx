import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.login.currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get("/api/v1/user/getpatients");
      if (response.data.success) {
        setPatient(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to load patient data");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      if (error.response?.status === 404) {
        toast.error("Patient profile not found. Please complete your registration.");
      } else {
        toast.error("Failed to load patient data");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading patient profile...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">No patient profile found</div>
          <p className="text-gray-500 mb-4">Please complete your patient registration to view your profile.</p>
          <button 
            onClick={() => window.location.href = '/registration'}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Complete Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mr-6">
              {patient.PatientName ? patient.PatientName.charAt(0).toUpperCase() : 'P'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{patient.PatientName || 'Patient'}</h1>
              <p className="text-blue-100 text-lg">Patient Profile</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-lg font-semibold text-gray-800">{patient.PatientName || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg font-semibold text-gray-800">{currentUser?.email || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-lg font-semibold text-gray-800">{patient.phoneNo || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Age</label>
                <p className="text-lg font-semibold text-gray-800">{patient.age ? `${patient.age} years` : 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Physical Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Physical Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Height</label>
                <p className="text-lg font-semibold text-gray-800">{patient.height ? `${patient.height} cm` : 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Weight</label>
                <p className="text-lg font-semibold text-gray-800">{patient.weight ? `${patient.weight} kg` : 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Address Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-600">Address</label>
              <p className="text-lg font-semibold text-gray-800">{patient.address || 'Not provided'}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">User ID</label>
                <p className="text-lg font-semibold text-gray-800">{patient.userId || 'Not available'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Registration Date</label>
                <p className="text-lg font-semibold text-gray-800">
                  {patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : 'Not available'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Edit Profile
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              Download Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile; 