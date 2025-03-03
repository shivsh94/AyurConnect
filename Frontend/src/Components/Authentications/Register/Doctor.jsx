import { motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";

function Doctor() {
  
const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    licenseNumber: "",
    yearsOfExperience: "",
    phoneNumber: "",
    address: "",
    speciality: "",
    hospitalName: "",
    certification: "",
});

const handleChange = (e) =>{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}

  return (
    <motion.div initial={{ x: "100vw", width: 0 }}   
    animate={{ x: 0, width: "100%" }}  
    transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.5 }}  className="backdrop-blur-lg p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-100">Name</label>
          <input
          name="name"
          value={formData.name}
          onChange={handleChange}
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="text"
            placeholder="Enter your Name"
          />

          <label className="font-medium text-gray-100">Gender</label>
          <select className="border border-blue-200 text-slate-400 rounded-full p-3  bg-slate-200 font-medium">
            <option value="" disabled selected>
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

          <label className="font-medium text-gray-100">License Number</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="number"
            placeholder="Enter your License Number"
          />

          <label className="font-medium text-gray-100">Years of Experience</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="number"
            placeholder="Years of Experience in Years"
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

          <label className="font-medium text-gray-100">Speciality</label>
          <select
            className="border border-blue-200 text-slate-400 rounded-full p-3 bg-slate-200 font-medium"
            defaultValue=""
          >
            <option value="" disabled>
              Select your speciality
            </option>
            <option value="Kayachikitsa (General Medicine)">
              Kayachikitsa (General Medicine)
            </option>
            <option value="Shalya Tantra (Surgery)">
              Shalya Tantra (Surgery)
            </option>
            <option value="Shalakya Tantra (ENT and Ophthalmology)">
              Shalakya Tantra (ENT and Ophthalmology)
            </option>
            <option value="Prasuti and Stri Roga (Gynecology and Obstetrics)">
              Prasuti and Stri Roga (Gynecology and Obstetrics)
            </option>
            <option value="Kaumarbhritya (Pediatrics)">
              Kaumarbhritya (Pediatrics)
            </option>
            <option value="Agada Tantra (Toxicology)">
              Agada Tantra (Toxicology)
            </option>
            <option value="Rasayana and Vajikarana (Geriatrics and Aphrodisiac Therapy)">
              Rasayana and Vajikarana (Geriatrics and Aphrodisiac Therapy)
            </option>
            <option value="Panchakarma Specialist">
              Panchakarma Specialist
            </option>
            <option value="Dravyaguna (Ayurvedic Pharmacology)">
              Dravyaguna (Ayurvedic Pharmacology)
            </option>
            <option value="Rog Nidan (Pathology)">Rog Nidan (Pathology)</option>
            <option value="Swasthavritta (Preventive Medicine)">
              Swasthavritta (Preventive Medicine)
            </option>
          </select>

          <label className="font-medium text-gray-100">Hospital/Clinic Name</label>
          <input
            className="border border-blue-200 rounded-full p-3 bg-slate-200 font-medium"
            type="text"
            placeholder="Enter Current Working Place"
          />

          <label className="font-medium text-gray-100">
          Upload Certifications
          </label>
          <input
            className="border border-blue-200 text-slate-500 rounded-full p-2 bg-slate-200 font-medium"
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

export default Doctor;
