import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Patients() {
  const [form, setForm] = useState({
    PatientName: "",
    age: "",
    phoneNo: "",
    address: "",
    height: "",
    weight: "",
    gender: "",
    bloodGroup: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.PatientName.trim()) {
      newErrors.PatientName = "Patient name is required";
    } else if (form.PatientName.trim().length < 2) {
      newErrors.PatientName = "Name must be at least 2 characters long";
    }

    // Age validation
    if (!form.age) {
      newErrors.age = "Age is required";
    } else if (form.age < 1 || form.age > 120) {
      newErrors.age = "Age must be between 1 and 120 years";
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!form.phoneNo) {
      newErrors.phoneNo = "Phone number is required";
    } else if (!phoneRegex.test(form.phoneNo)) {
      newErrors.phoneNo = "Invalid phone number! Must be 10 digits & start from 6-9";
    }

    // Address validation
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    } else if (form.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters long";
    }

    // Height validation
    if (!form.height) {
      newErrors.height = "Height is required";
    } else if (form.height < 1 || form.height > 300) {
      newErrors.height = "Height must be between 1 and 300 cm";
    }

    // Weight validation
    if (!form.weight) {
      newErrors.weight = "Weight is required";
    } else if (form.weight < 1 || form.weight > 500) {
      newErrors.weight = "Weight must be between 1 and 500 kg";
    }

    // Gender validation
    if (!form.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/patientsRegistration`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Patient profile completed successfully!");
        // Redirect to patient dashboard
        setTimeout(() => {
          navigate("/patient/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error in Patient registration:", error);
      toast.error(
        error.response?.data?.message || "Failed to complete profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = "text", placeholder, icon, ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-green-400">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        <span className="text-red-400 ml-1">*</span>
      </label>
      <input
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-900 text-white placeholder-gray-400 ${
          errors[name] 
            ? "border-red-500 bg-red-900/20" 
            : "border-gray-600 hover:border-green-500"
        }`}
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        onFocus={() => clearError(name)}
        placeholder={placeholder}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-400 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, icon, ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-green-400">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        <span className="text-red-400 ml-1">*</span>
      </label>
      <select
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-900 text-white ${
          errors[name] 
            ? "border-red-500 bg-red-900/20" 
            : "border-gray-600 hover:border-green-500"
        }`}
        name={name}
        value={form[name]}
        onChange={handleChange}
        onFocus={() => clearError(name)}
        {...props}
      >
        <option value="" className="bg-gray-900 text-gray-400">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-900 text-white">
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-400 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Complete Your Patient Profile</h2>
        <p className="text-gray-300">Please provide your details to complete your registration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="PatientName"
              placeholder="Enter your full name"
              icon="👤"
            />
            <InputField
              label="Age"
              name="age"
              type="number"
              placeholder="Enter your age"
              min="1"
              max="120"
              icon="🎂"
            />
            <InputField
              label="Phone Number"
              name="phoneNo"
              placeholder="Enter your phone number"
              icon="📱"
            />
            <SelectField
              label="Gender"
              name="gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" }
              ]}
              icon="⚧"
            />
          </div>
        </div>

        {/* Physical Information */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Physical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Height (cm)"
              name="height"
              type="number"
              placeholder="Height in centimeters"
              min="1"
              max="300"
              icon="📏"
            />
            <InputField
              label="Weight (kg)"
              name="weight"
              type="number"
              placeholder="Weight in kilograms"
              min="1"
              max="500"
              icon="⚖️"
            />
            <SelectField
              label="Blood Group"
              name="bloodGroup"
              options={[
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
                { value: "O+", label: "O+" },
                { value: "O-", label: "O-" }
              ]}
              icon="🩸"
            />
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address Information
          </h3>
          <InputField
            label="Complete Address"
            name="address"
            placeholder="Enter your complete address"
            icon="🏠"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center space-x-2 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Completing Profile...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Complete Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Patients;
