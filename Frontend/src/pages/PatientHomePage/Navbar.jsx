import React, { useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../features/login/loginSlice';

function Navbar() {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.login.currentUser);

  useEffect(() => {

    const fetchPatients = async () => {
      try {
        const response = await axios.get("/getpatients");
        if (response.data.success) {
          console.log(response.data);
          dispatch(login(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/signout");
      if (response.data.success) {
        dispatch(logout());
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <div className="w-full flex items-center justify-between h-36 bg-black">
      {/* Logo Section */}
      <div className="flex items-center p-10">
        <Link to="/patient/dashboard">
          <img
            width={120}
            height={120}
            src={logo}
            alt="Ayurconnect Logo"
            className="rounded-full"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-5 text-[20px] pr-10 tracking-wider">
        <NavLink to="/patient/dashboard" className="hover:text-blue-400 transition-colors duration-200">
          Home
        </NavLink>
        <NavLink to="/patient/appointments" className="hover:text-blue-400 transition-colors duration-200">
          Appointments
        </NavLink>
        <NavLink to="/patient/blogs" className="hover:text-blue-400 transition-colors duration-200">
          Blogs
        </NavLink>
        <NavLink to="/patient/contact" className="hover:text-blue-400 transition-colors duration-200">
          Contact Us
        </NavLink>

        {/* Show Login if No User, Otherwise Show Logout */}
        {patient ? (
          <button onClick={handleLogout} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            Login
          </NavLink>
        )}

        {/* Patient Name Button */}
        {patient && patient.PatientName ? (
          <button className="bg-blue-400 text-white px-4 py-2 rounded-md">
            {patient.PatientName}
          </button>
        ) : (
          <button className="bg-gray-400 text-white px-4 py-1 rounded-md">
            Guest
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
