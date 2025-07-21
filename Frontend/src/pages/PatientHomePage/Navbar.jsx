import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';
import {loadDoctor, clearDoctor} from '../../features/doctor/doctorSlice';
import { useDispatch } from 'react-redux';

function Navbar() {
  const dispatch = useDispatch();
  const { currentUser, logoutUser } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/v1/user/getpatients");
        if (response.data.success) {
          setPatientData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    if (currentUser && !currentUser.isDoctor) {
      fetchPatients();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearDoctor());
      setShowProfileDropdown(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={logo} alt="AyurConnect" />
              <span className="ml-2 text-xl font-bold text-gray-900">AyurConnect</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink
              to="/patient/dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/patient/about-us"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`
              }
            >
              About Us
            </NavLink>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {patientData?.name || currentUser?.email || 'User'}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showProfileDropdown ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/patient/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/patient/appointments"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    My Appointments
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
