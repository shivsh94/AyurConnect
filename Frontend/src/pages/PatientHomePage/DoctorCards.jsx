import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorCard({ key, name, degree, experience, specialty, image, id }) {

  const navigate = useNavigate();
  console.log(name, degree, experience, specialty, image, id);


  const handleViewProfileClick = () => {
    navigate(`/Profile/${id}`);
  };

  const handleAppointment = () => {
    navigate(`/Patient/${id}/appointments`);
  };



  return (
    <div className="bg-black shadow-md rounded-lg overflow-hidden border border-yellow-200 hover:border-yellow-300 hover:scale-105 flex">
      {/* Profile Image Section */}
      <div className="flex-none w-24 h-24 bg-black mt-5 mr-2 ml-3 relative">
        <img
          src={image}
          alt={name}
          className="rounded-full w-full h-full object-cover absolute inset-0"
        />
      </div>

      {/* Doctor Details Section */}
      <div className="p-4 flex-grow mt-5">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-500 font-medium">Degree: {degree}</p>
        <p className="text-gray-500 font-medium">Specialty: {specialty}</p>
        <p className="text-gray-500 font-medium">
          Experience: {experience} years
        </p>

         
        <div className="mt-4 flex  justify-evenly space-x-2">
          <button onClick={handleAppointment} className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white font-bold py-2 px-4 rounded-md transition duration-300">
            Book Appointment
          </button>
          <button onClick={handleViewProfileClick} className="bg-gray-200 hover:bg-gray-300 hover:scale-105 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function DoctorsList() {
  const doctors = useSelector((state) => state.doctor.currentDoctor) || [];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 ">
      {doctors.length > 0 && doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          name={doctor.name}
          degree={doctor?.degree}
          experience={doctor.experience}
          specialty={doctor.speciality}
          image={doctor.image}
          id={doctor._id}
        />
      ))}
    </div>
  );
}

export default DoctorsList;
