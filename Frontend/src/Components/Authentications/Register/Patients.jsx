import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

function Patients() {
  const [form, setForm] = useState({
    PatientName: "",
    // gender: "",
    age: "",
    // Problem: "",
    // AnyMedicalHistory: "",
    phoneNo: "",
    address: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.PatientName ||
      // !form.gender ||
      !form.age ||
      // !form.Problem ||
      !form.phoneNo ||
      !form.address ||
      !form.height ||
      !form.weight
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/patientsRegistration`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Patient Registered Successfully!");
        setForm({
          PatientName: "",
          // gender: "",
          age: "",
          // Problem: "",
          // AnyMedicalHistory: "",
          phoneNo: "",
          address: "",
          height: "",
          weight: "",
        });
      }
    } catch (error) {
      console.error("Error in Patient registration:", error);
      toast.error("Failed to register patient.");
    }
  };

  return (
    <motion.div
      initial={{ x: "-100vw", width: 0 }}
      animate={{ x: 0, width: "100%" }}
      transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.5 }}
      className="backdrop-blur-lg p-4 rounded-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          {/* Left Side */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-gray-100">Patient's Name</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="text"
              name="PatientName"
              value={form.PatientName}
              onChange={handleChange}
              placeholder="Enter your Name"
            />

            {/* <label className="font-medium text-gray-100">Gender</label>
            <select
              className="border border-blue-200 text-slate-400 rounded-full p-3 bg-slate-200 font-medium"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select> */}

            <label className="font-medium text-gray-100">Age</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your Age"
            />
{/* 
            <label className="font-medium text-gray-100">Problem</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="text"
              name="Problem"
              value={form.Problem}
              onChange={handleChange}
              placeholder="Enter your Problem"
            /> */}

            {/* <label className="font-medium text-gray-100">
              Any Medical History
            </label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="text"
              name="AnyMedicalHistory"
              value={form.AnyMedicalHistory}
              onChange={handleChange}
              placeholder="Enter your Medical History"
            /> */}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-gray-100">Phone Number</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="text"
              name="phoneNo"
              value={form.phoneNo}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
            />

            <label className="font-medium text-gray-100">Address</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your Address"
            />

            <label className="font-medium text-gray-100">Height</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Enter your Height in feet"
            />

            <label className="font-medium text-gray-100">Weight</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Enter your Weight in Kg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            className="border border-blue-200 rounded-2xl p-4 bg-slate-200 font-medium hover:bg-indigo-200 hover:font-bold transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Patients;
