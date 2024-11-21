import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
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
    type: Number,
    required: true,
  },
  clinic: {
    type: String,
    required: true,
  },
  Experience: {
    type: Number,
    required: true,
  },
  uploadYourCertificate: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;