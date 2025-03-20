import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String, // Changed from Number to String to prevent truncation
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  licence: {
    type: String, // Changed from Number to String
    required: true,
  },
  clinic: {
    type: String,
    required: true,
  },
  experience: { // Changed from Experience to experience (camelCase)
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestedAppointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
   
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
