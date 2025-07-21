import React, { useState } from "react";
import Doctor from "./Doctor";
import Patients from "./Patients";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Registration() {
  const [form, setForm] = useState("patient");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Header */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <Link 
              to="/login" 
              className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200"
            >
              Already have an account? Sign In
            </Link>
          </div>

          {/* Logo and Title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">AyurConnect</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete your profile to start your journey with Ayurvedic healthcare
            </p>
          </motion.div>
        </div>
      </div>

      {/* Registration Type Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl p-2 flex border border-green-500/20">
            <button
              onClick={() => setForm("patient")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                form === "patient"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
                  : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Register as Patient</span>
              </div>
            </button>
            
            <button
              onClick={() => setForm("doctor")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                form === "doctor"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
                  : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Register as Doctor</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Registration Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-4 pb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-500/20">
            {form === "patient" ? <Patients /> : <Doctor />}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="relative z-10 bg-black/80 border-t border-green-500/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">© 2024 AyurConnect. All rights reserved.</p>
            <p className="text-sm">
              Connecting you with authentic Ayurvedic healthcare practitioners
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
