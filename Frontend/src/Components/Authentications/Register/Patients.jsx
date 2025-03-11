import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

function Patients() {
  const [form, setForm] = useState({
    PatientName: "",
    age: "",
    phoneNo: "",
    address: "",
    height: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (
      !form.PatientName ||
      !form.age ||
      !form.phoneNo ||
      !form.address ||
      !form.height ||
      !form.weight
    ) {
      toast.error("All fields are required");
      return;
    }

     
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phoneNo)) {
      toast.error("Invalid Phone Number! Must be 10 digits & start from 6-9.");
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
        toast.success("Patient Registered Successfully!");
 
        setForm({
          PatientName: "",
          age: "",
          phoneNo: "",
          address: "",
          height: "",
          weight: "",
        });
      }
    } catch (error) {
      console.error("Error in Patient registration:", error);
      toast.error(
        error.response?.data?.message || "Failed to register patient."
      );
    } finally {
      setLoading(false);
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

            <label className="font-medium text-gray-100">Age</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your Age"
            />
          </div>
 
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

            <label className="font-medium text-gray-100">Height (ft)</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Height (in Feet)"
            />

            <label className="font-medium text-gray-100">Weight (Kg)</label>
            <input
              className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight (in Kg)"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            className={`border border-blue-200 rounded-2xl p-4 bg-slate-200 font-medium transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-200"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Submit"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Patients;
