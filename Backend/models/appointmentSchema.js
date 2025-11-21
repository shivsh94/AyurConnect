import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  reason: {
    type: String,
    required: false,
  },
  meetingId: {
    type: String,
    default: null,
  },
  meetingUrl: {
    type: String,
    default: null,
  },
  meetingStatus: {
    type: String,
    enum: ["not_started", "ongoing", "ended"],
    default: "not_started",
  },
  meetingStartedAt: {
    type: Date,
    default: null,
  },
  meetingEndedAt: {
    type: Date,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

appointmentSchema.index({ doctorId: 1, appointmentTime: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
