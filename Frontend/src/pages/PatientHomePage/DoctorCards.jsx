import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patient/${doctor._id}/appointments`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform duration-200">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={doctor.image || "https://via.placeholder.com/64x64?text=Dr"}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Dr. {doctor.name}</h3>
            <p className="text-gray-600">{doctor.speciality}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Degree:</span> {doctor.degree || "MBBS"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Experience:</span> {doctor.experience || "Not specified"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Clinic:</span> {doctor.clinic || "Not specified"}
          </p>
        </div>
        
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

function DoctorCards() {
  const doctors = useSelector((state) => state.doctor.currentDoctor) || [];

  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Doctors Found</h3>
        <p className="text-gray-500">Please try a different search or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor, index) => (
        <DoctorCard key={doctor._id || index} doctor={doctor} />
      ))}
    </div>
  );
}

export default DoctorCards;
