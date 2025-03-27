import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import img from "../../assets/doc.png";
import RequestedAppointments from "./Requested";
import PatientList from "./PatientList";
import PatientHistory from "./patientHistory";
import StarRating from "./StarRating";
import BlogPopup from "./BlogPopup";
import { useSelector } from "react-redux";

function Doctor() {
  const [showRequestedAppointments, setShowRequestedAppointments] = useState(false);
  const [showPatientList, setShowPatientList] = useState(true);
  const [showPatientHistory, setShowPatientHistory] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const doctor = useSelector((state) => state.login.currentUser);
  
  console.log(doctor);

  const doctors = {
    name: doctor.name,
    specialization:  doctor.speciality,
    contact:  doctor.phone,
    // email: "dr.johndoe@gmail.com",
    experience:  doctor.experience,
    location:  doctor.clinic,
    rating: 3.5,
  };


  const handleRequestedAppointmentsClick = () => {
    setShowRequestedAppointments(true);
    setShowPatientList(false);
    setShowPatientHistory(false);
  };

  const handlePatientListClick = () => {
    setShowPatientList(true);
    setShowRequestedAppointments(false);
    setShowPatientHistory(false);
  };

  const handlePatientHistoryClick = () => {
    setShowPatientHistory(true);
    setShowRequestedAppointments(false);
    setShowPatientList(false);
  };

  const handleNewBlogSubmit = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="bg-black">

      <div className="w-full h-full flex mt-28 bg-black">

        <div className="bg-black w-1/4 h-screen">
          <div className="flex flex-col items-center justify-center pt-10 gap-5 ">
            <img width={150} height={150} src={img} alt="" />
            <h1>{doctor.name}</h1>
            <p className="text-gray-400">{doctor.speciality}</p>
            <p className="text-gray-400">{doctor.experience}</p>
            <p className="text-gray-400">{doctor.clinic}</p>
            <p className="text-gray-400">{doctor.phone}</p>
            {/* <p className="text-gray-400">{doctor.email}</p> */}
            <StarRating rating={Math.round(doctors.rating)} />
            <button
              onClick={togglePopup}
              className="w-1/2 cursor-pointer border border-yellow-200 rounded-full h-12 px-5 font-bold hover:shadow-xl hover:scale-105 duration-300 transition-all"
            >
              Write Blog
            </button>
          </div>
        </div>

        <div className="mr-10 absolute ml-96">
          <div className="grid grid-cols-3 gap-7 pt-5 pr-40">
            <button
              onClick={()=>handleRequestedAppointmentsClick()}
              className={`cursor-pointer flex items-center justify-center overflow-hidden rounded-full h-12 px-5 text-base font-bold leading-normal tracking-[0.015em] w-full transition-all ${showRequestedAppointments
                ? " border border-yellow-200 hover:shadow-xl transition-shadow duration-300 text-white"
                : "text-white hover:bg-gray-500"
                } hover:scale-105 `}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              <span>Requested Appointments</span>
            </button>

            <button
              onClick={handlePatientListClick}
              className={`cursor-pointer flex items-center justify-center overflow-hidden rounded-full h-12 px-5 text-base font-bold leading-normal tracking-[0.015em] w-full transition-all ${showPatientList
                ? "bg-gray-400 border border-yellow-200 hover:shadow-xl transition-shadow duration-300 text-white"
                : "bg-gray-400 text-white hover:bg-gray-500"
                } hover:scale-105 `}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              <span>Patient List</span>
            </button>

            <button
              onClick={handlePatientHistoryClick}
              className={`cursor-pointer flex items-center justify-center overflow-hidden rounded-full h-12 px-5 text-base font-bold leading-normal tracking-[0.015em] w-full transition-all ${showPatientHistory
                ? "bg-gray-400 border border-yellow-200 hover:shadow-xl transition-shadow duration-300 text-white"
                : "bg-gray-400 text-white hover:bg-gray-500"
                } hover:scale-105 `}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              <span>Patient History</span>
            </button>
          </div>

          {/* Conditionally render sections */}
          {showRequestedAppointments && <RequestedAppointments />}
          {showPatientList && <PatientList />}
          {showPatientHistory && <PatientHistory />}

          {/* Blog Section with Dummy Blog Cards */}
          <div>
            <h2 className="text-white text-xl mt-10">Blog Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-gray-800 p-4 rounded-md shadow-md hover:scale-105 transition-transform duration-200">
                  <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-md" />
                  <h3 className="text-white text-lg font-semibold mt-2">{blog.title}</h3>
                  <p className="text-gray-400">{blog.snippet}</p>
                  <button className="mt-2 text-blue-400 hover:underline">Read More</button>
                </div>
              ))}
            </div>
          </div>

          {/* Render BlogPopup if it's open */}
          {isPopupOpen && (
            <BlogPopup
              onClose={togglePopup}
              onSubmit={handleNewBlogSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctor;
