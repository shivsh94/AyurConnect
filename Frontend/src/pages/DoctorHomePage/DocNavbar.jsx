import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { login, logout } from '../../features/login/loginSlice';
import { clearDoctor } from '../../features/doctor/doctorSlice';
import { toast } from 'react-hot-toast';

function DocNavbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctor = useSelector((state) => state.login.currentUser);

  useEffect(() => {

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/v1/user/getdoctor");
        if (response.data.success) {
          dispatch(login(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/user/signout");
      if (response.data.success) {
        dispatch(logout());
        dispatch(clearDoctor());
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className='mb-16'>
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center p-3 justify-between bg-black text-white">
        <div className="pl-10">
          <img width={80} height={80} src={logo} alt="logo" className="rounded-full" />
        </div>
        <div className="flex gap-5 text-[20px] pr-16 tracking-wider items-center">
          <NavLink
            to="/doctor/Docdashboard"
            className="hover:text-green-300 hover:underline hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/doctor/profile"
            className="hover:text-green-300 hover:underline hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Profile
          </NavLink>
          <NavLink
            to="/doctor/appointments"
            className="hover:text-green-300 hover:underline hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Appointments
          </NavLink>
          <NavLink
            to="/doctor/patients"
            className="hover:text-green-300 hover:underline hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Patients
          </NavLink>
          <NavLink
            to="/doctor/blogs"
            className="hover:text-green-300 hover:underline hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Blogs
          </NavLink>
          
          {/* Doctor Name */}
          <div className="text-1xl border-l-2 pl-10">
             <p className='border border-yellow-200 px-2 py-2 rounded-2xl font-bold'>Dr. {doctor.name}</p>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocNavbar
