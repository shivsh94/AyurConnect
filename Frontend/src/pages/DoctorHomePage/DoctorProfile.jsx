import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import img from "../../assets/doc.png";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.login.currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get("/api/v1/user/getdoctor");
      if (response.data.success) {
        setDoctor(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to load doctor data");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Failed to load doctor data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading doctor profile...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">No doctor profile found</div>
          <p className="text-gray-500 mb-4">Please complete your doctor registration to view your profile.</p>
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
    <div className="mx-auto p-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 px-8 py-8 mb-16">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6">
              <img 
                src={img} 
                alt="Doctor" 
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Dr. {doctor.name || 'Doctor'}</h1>
              <p className="text-green-100 text-lg">{doctor.speciality || 'Specialist'}</p>
              <p className="text-green-200">{doctor.clinic || 'Clinic'}</p>
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
                <p className="text-lg font-semibold text-gray-800">Dr. {doctor.name || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg font-semibold text-gray-800">{currentUser?.email || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-lg font-semibold text-gray-800">{doctor.phone || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Speciality</label>
                <p className="text-lg font-semibold text-gray-800">{doctor.speciality || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Experience</label>
                <p className="text-lg font-semibold text-gray-800">{doctor.experience || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Clinic/Hospital</label>
                <p className="text-lg font-semibold text-gray-800">{doctor.clinic || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">License Number</label>
                <p className="text-lg font-semibold text-gray-800">{doctor.licenseNo || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Registration Date</label>
                <p className="text-lg font-semibold text-gray-800">
                  {doctor.createdAt ? new Date(doctor.createdAt).toLocaleDateString() : 'Not available'}
                </p>
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
              <p className="text-lg font-semibold text-gray-800">{doctor.address || 'Not provided'}</p>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Education & Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Degree</label>
                <p className="text-lg font-semibold text-gray-800">{doctor.degree || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">University</label>
                <p className="text-lg font-semibold text-gray-800">{doctor.university || 'Not provided'}</p>
              </div>
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
                <p className="text-lg font-semibold text-gray-800">{doctor.userId || 'Not available'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-600">Account Status</label>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200">
              Edit Profile
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Download Profile
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              View Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile; 