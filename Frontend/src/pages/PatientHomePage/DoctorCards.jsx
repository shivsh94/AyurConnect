import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorCard({ name, degree, experience, speciality, image, id }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctor.currentDoctor);
  // console.log("DoctorCard", doctor);

  const handleViewProfileClick = () => {
    navigate(`/Profile/${id}`);
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
        <h2 className="text-xl font-bold mb-2">{doctor[0].name}</h2>
        <p className="text-gray-500 font-medium">Degree: {degree}</p>
        <p className="text-gray-500 font-medium">Specialty: {doctor[0].speciality}</p>
        <p className="text-gray-500 font-medium">
          Experience: {doctor[0].experience} years
        </p>

        {/* Button Container */}
        <div className="mt-4 flex  justify-evenly space-x-2">
          <button className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white font-bold py-2 px-4 rounded-md transition duration-300">
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
  const doctors = [
    {
      id: "1",
      name: "Dr. John Doe",
      degree: "MBBS, MD",
      experience: 15,
      specialty: [
        "Pediatrics ",
        "Cardiology ",
        "Neurology ",
        "Orthopedics ",
        "Dermatology ",
      ],
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      degree: "MBBS, MS",
      experience: 10,
      specialty: [
        "Pediatrics ",
        "Cardiology ",
        "Neurology ",
        "Orthopedics ",
        "Dermatology ",
      ],
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Dr. Alex Johnson",
      degree: "MBBS, MCh",
      experience: 20,
      specialty: "Orthopedics",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Dr. Emily White",
      degree: "MBBS, MD",
      experience: 12,
      specialty: "Pediatrics",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 ">
      {doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          name={doctor.name}
          degree={doctor.degree}
          experience={doctor.experience}
          specialty={doctor.specialty}
          image={doctor.image}
          id={doctor.id}
        />
      ))}
    </div>
  );
}

export default DoctorsList;
