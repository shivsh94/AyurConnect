import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function doctorProfile() {
  const [doctor, setDoctor] = useState({});
  const { id } = useParams();

  useEffect(()=> {
    window.scrollTo(0, 0);
  },[]);

  useEffect(() => {
    const foundDoctor = doctors.find((item) => item.id === id);
    if (foundDoctor) {
      setDoctor(foundDoctor);
    }
  }, [id]);
  console.log(doctor);
  return (
    <div className="mx-auto p-8">
      {doctor.name ? (
        <div>
          <div className="grid grid-cols-6 items-center ml-5">
            <img
              src={doctor.image}
              alt="Doctor"
              className="rounded-full col-span-1 w-32 h-32 mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold">{doctor.name}</h1>
              <p className="text-xl text-gray-600">{doctor.specialist}</p>
              <p className="text-md text-gray-500">{doctor.working}</p>
            </div>
          </div>
          <div className="mt-8  ">
            <h2 className="text-2xl font-bold ml-5 mt-12">Biography</h2>
            <p className="border border-yellow-300 rounded-2xl p-3 m-5">
              {doctor.name}, {doctor.discription}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold ml-5 mt-12">Specialties</h2>
            <ul className="border border-yellow-300 rounded-2xl p-3 m-5 flex gap-3">
              {doctor.specialty.map((item) => (
                <li className="flex justify-center items-center gap-2 font-medium bg-gray-200 text-black rounded-full px-3 py-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <h2 className="  text-2xl font-bold ml-5 mt-12">
                Experience
              </h2>
              <ul className=" border border-yellow-300 rounded-2xl p-3 m-5 flex flex-col gap-3">
                {doctor.experience.map((item) => (
                  <li className="flex justify-start items-center gap-2 font-medium bg-gray-200 text-black rounded-full px-3 py-2">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <h2 className="text-2xl font-bold ml-5 mt-12">Education</h2>
              <ul className="border border-yellow-300 rounded-2xl p-3 m-5 flex flex-col gap-3">
                {doctor.degree.map((item) => (
                  <li className="flex justify-start items-center gap-2 font-medium bg-gray-200 text-black rounded-full px-3 py-2">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-1/2">
            <h2 className="text-2xl font-bold ml-5 mt-12">Contact</h2>
            <ul className="border border-yellow-300 rounded-2xl p-3 m-5 flex flex-col gap-3">
              <li className="flex justify-start items-center gap-2 font-medium bg-gray-200 text-black rounded-full px-3 py-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                {doctor.email}
              </li>
              <li className="flex justify-start items-center gap-2 font-medium bg-gray-200 text-black rounded-full px-3 py-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                {doctor.phone}
              </li>
              <li className="flex justify-start items-center gap-2 font-medium bg-gray-200 text-black rounded-full px-3 py-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                {doctor.address}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>No Record Found</div>
      )}
    </div>
  );
}

const doctors = [
  {
    id: "1",
    name: "Dr. John Doe",
    email : "xyz@gmail.com",
    phone : "1234567890",
    address : "xyz hospital",
    degree: ["MBBS",
       "MD",
       "DM"
      ],
    experience: [
      "Senior Consultant at [Hospital Name]",
      "Resident Doctor at [Institution Name]",
      "Specialist in [Field] at [Clinic/Hospital Name]",
      "Research & Publications",
      "Global Outreach and Training",
    ],
    specialist: "Cardiolist",
    working: "xyz hospital",
    discription:
      " is a highly skilled and board-certified [specialty] with over [number] years of experience in providing exceptional patient care. Dr. [Last Name] specializes in the diagnosis, treatment, and management of [specific conditions related to the specialty], offering both personalized treatment plans and the latest in medical technology to ensure the best outcomes for patients.",
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
    name: "Dr. John Doe",
    email : "xyz@gmail.com",
    phone : "1234567890",
    address : "xyz hospital",
    degree: ["MBBS",
       "MD",
       "DM"
      ],
    experience: [
      "Senior Consultant at [Hospital Name]",
      "Resident Doctor at [Institution Name]",
      "Specialist in [Field] at [Clinic/Hospital Name]",
      "Research & Publications",
      "Global Outreach and Training",
    ],
    specialist: "Cardiolist",
    working: "xyz hospital",
    discription:
      " is a highly skilled and board-certified [specialty] with over [number] years of experience in providing exceptional patient care. Dr. [Last Name] specializes in the diagnosis, treatment, and management of [specific conditions related to the specialty], offering both personalized treatment plans and the latest in medical technology to ensure the best outcomes for patients.",
    specialty: [
      "Pediatrics ",
      "Cardiology ",
      "Neurology ",
      "Orthopedics ",
      "Dermatology ",
    ],
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Dr. John Doe",
    email : "xyz@gmail.com",
    phone : "1234567890",
    address : "xyz hospital",
    degree: ["MBBS",
       "MD",
       "DM"
      ],
    experience: [
      "Senior Consultant at [Hospital Name]",
      "Resident Doctor at [Institution Name]",
      "Specialist in [Field] at [Clinic/Hospital Name]",
      "Research & Publications",
      "Global Outreach and Training",
    ],
    specialist: "Cardiolist",
    working: "xyz hospital",
    discription:
      " is a highly skilled and board-certified [specialty] with over [number] years of experience in providing exceptional patient care. Dr. [Last Name] specializes in the diagnosis, treatment, and management of [specific conditions related to the specialty], offering both personalized treatment plans and the latest in medical technology to ensure the best outcomes for patients.",
    specialty: [
      "Pediatrics ",
      "Cardiology ",
      "Neurology ",
      "Orthopedics ",
      "Dermatology ",
    ],
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Dr. John Doe",
    email : "xyz@gmail.com",
    phone : "1234567890",
    address : "xyz hospital",
    degree: ["MBBS",
       "MD",
       "DM"
      ],
    experience: [
      "Senior Consultant at [Hospital Name]",
      "Resident Doctor at [Institution Name]",
      "Specialist in [Field] at [Clinic/Hospital Name]",
      "Research & Publications",
      "Global Outreach and Training",
    ],
    specialist: "Cardiolist",
    working: "xyz hospital",
    discription:
      " is a highly skilled and board-certified [specialty] with over [number] years of experience in providing exceptional patient care. Dr. [Last Name] specializes in the diagnosis, treatment, and management of [specific conditions related to the specialty], offering both personalized treatment plans and the latest in medical technology to ensure the best outcomes for patients.",
    specialty: [
      "Pediatrics ",
      "Cardiology ",
      "Neurology ",
      "Orthopedics ",
      "Dermatology ",
    ],
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

export default doctorProfile;
