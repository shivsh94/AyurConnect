import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Homepage = () => {
  return (
    <div className="relative w-screen h-screen bg-black flex flex-col justify-center items-center overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80 z-0" />
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-5 rounded-full blur-2xl z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl z-0" />
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <img src={logo} alt="AyurConnect Logo" className="w-32 h-32 mb-6 drop-shadow-lg" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 font-[Bebas Neue]">AYURCONNECT</h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 text-center max-w-xl font-light">
          Bridging Patients and Ayurvedic Doctors for a Healthier Tomorrow
        </p>
        <div className="flex gap-6">
          <Link to="/login">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-200 transition-all text-lg">
              Get Started
            </button>
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4 text-center max-w-md">
          New users will be automatically registered after email verification
        </p>
      </div>
    </div>
  );
};

export default Homepage;
