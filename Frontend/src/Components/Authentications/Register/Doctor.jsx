import { motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Doctor() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
    age: "",
    speciality: "",
    licence: "",
    clinic: "",
    experience: "",
    email: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
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
    if (!formData.name.trim()) {
      newErrors.name = "Doctor name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number! Must be 10 digits & start from 6-9";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters long";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 25 || formData.age > 80) {
      newErrors.age = "Age must be between 25 and 80 years";
    }

    // Speciality validation
    if (!formData.speciality) {
      newErrors.speciality = "Speciality is required";
    }

    // License validation
    if (!formData.licence.trim()) {
      newErrors.licence = "License number is required";
    } else if (formData.licence.trim().length < 5) {
      newErrors.licence = "License number must be at least 5 characters";
    }

    // Clinic validation
    if (!formData.clinic.trim()) {
      newErrors.clinic = "Clinic/Hospital name is required";
    }

    // Experience validation
    if (!formData.experience) {
      newErrors.experience = "Years of experience is required";
    } else if (formData.experience < 0 || formData.experience > 50) {
      newErrors.experience = "Experience must be between 0 and 50 years";
    }

    // Education validation
    if (!formData.education.trim()) {
      newErrors.education = "Education qualification is required";
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
      const response = await axios.post("/doctorRegistration", formData, {
        withCredentials: true
      });
      
      if (response.data.success) {
        toast.success("Doctor profile completed successfully!");
        // Redirect to doctor dashboard
        setTimeout(() => {
          navigate("/doctor/Docdashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
        value={formData[name]}
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
        value={formData[name]}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Complete Your Doctor Profile</h2>
        <p className="text-gray-300">Please provide your professional details to complete your registration</p>
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
              name="name"
              placeholder="Enter your full name"
              icon="👨‍⚕️"
            />
            <InputField
              label="Phone Number"
              name="phone"
              placeholder="Enter your phone number"
              icon="📱"
            />
            <InputField
              label="Age"
              name="age"
              type="number"
              placeholder="Enter your age"
              min="25"
              max="80"
              icon="🎂"
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

        {/* Professional Information */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            Professional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Speciality"
              name="speciality"
              options={[
                { value: "Kayachikitsa (General Medicine)", label: "Kayachikitsa (General Medicine)" },
                { value: "Shalya Tantra (Surgery)", label: "Shalya Tantra (Surgery)" },
                { value: "Shalakya Tantra (ENT and Ophthalmology)", label: "Shalakya Tantra (ENT and Ophthalmology)" },
                { value: "Prasuti and Stri Roga (Gynecology and Obstetrics)", label: "Prasuti and Stri Roga (Gynecology and Obstetrics)" },
                { value: "Kaumarbhritya (Pediatrics)", label: "Kaumarbhritya (Pediatrics)" },
                { value: "Agada Tantra (Toxicology)", label: "Agada Tantra (Toxicology)" },
                { value: "Rasayana and Vajikarana (Geriatrics and Aphrodisiac Therapy)", label: "Rasayana and Vajikarana (Geriatrics and Aphrodisiac Therapy)" },
                { value: "Panchakarma Specialist", label: "Panchakarma Specialist" },
                { value: "Dravyaguna (Ayurvedic Pharmacology)", label: "Dravyaguna (Ayurvedic Pharmacology)" },
                { value: "Rog Nidan (Pathology)", label: "Rog Nidan (Pathology)" },
                { value: "Swasthavritta (Preventive Medicine)", label: "Swasthavritta (Preventive Medicine)" }
              ]}
              icon="🏥"
            />
            <InputField
              label="License Number"
              name="licence"
              placeholder="Enter your medical license number"
              icon="📜"
            />
            <InputField
              label="Years of Experience"
              name="experience"
              type="number"
              placeholder="Years of experience"
              min="0"
              max="50"
              icon="⏰"
            />
            <InputField
              label="Education Qualification"
              name="education"
              placeholder="e.g., BAMS, MD (Ayurveda)"
              icon="🎓"
            />
          </div>
        </div>

        {/* Practice Information */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Practice Information
          </h3>
          <div className="space-y-6">
            <InputField
              label="Hospital/Clinic Name"
              name="clinic"
              placeholder="Enter your current working place"
              icon="🏥"
            />
            <InputField
              label="Complete Address"
              name="address"
              placeholder="Enter your complete address"
              icon="🏠"
            />
          </div>
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

export default Doctor;
