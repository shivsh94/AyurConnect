import React from "react";
import { motion } from "framer-motion";

function Patients() {
  return (
    <motion.div initial={{ x: "-100vw", width: 0 }}   
    animate={{ x: 0, width: "100%" }}    
    transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.5 }}   className="backdrop-blur-lg p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-100">Patient's Name</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="text"
            placeholder="Enter your Name"
          />

          <label className="font-medium text-gray-100">Gender</label>
          <select className="border border-blue-200 text-slate-400 rounded-full p-3  bg-slate-200 font-medium">
            <option className="text-slate-500"  value="" disabled selected>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="font-medium text-gray-100">Age</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="number"
            placeholder="Enter your Age"
          />

          <label className="font-medium text-gray-100">Problem</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="text"
            placeholder="Enter your Problem"
          />

          <label className="font-medium text-gray-100">
            Any Medical History
          </label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="text"
            placeholder="Enter your Medical History"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-100">Phone Number</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="text"
            placeholder="Enter your Phone Number"
          />

          <label className="font-medium text-gray-100">Address</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="text"
            placeholder="Enter your Address"
          />

          <label className="font-medium text-gray-100">Height</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="number"
            placeholder="Enter your Height in feet"
          />

          <label className="font-medium text-gray-100">Weight</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="number"
            placeholder="Enter your Weight in Kg"
          />

          <label className="font-medium text-gray-100">
            Any Previous Report
          </label>
          <input
            className="border border-blue-200 rounded-full p-2 bg-slate-200 font-medium"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            placeholder="Upload Your Report"
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        <button
          type="submit"
          className="border border-blue-200 rounded-2xl  p-4 bg-slate-200 font-medium hover:bg-indigo-200 hover:font-bold transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </motion.div>
  );
}

export default Patients;
