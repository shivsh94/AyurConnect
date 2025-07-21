import express from "express";
import { 
  signup,
  signin,
  logout,
  sendOTP,
  verifyEmail,
  refreshToken,
  getProfile
} from "../controllers/userController.js";
import {doctorRegistration, getAllDoctors, getDoctors, getPatients} from "../controllers/registerController.js";
import {patientsRegistration} from "../controllers/registerController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createAppointment, getAppointments, getPatientAppointments, getDoctorAppointments, cancelAppointment, acceptAppointment, declineAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

// Authentication routes (public)
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/send-otp", sendOTP);
router.post("/verifyEmail", verifyEmail);
router.post("/refresh-token", refreshToken);

// User profile routes (protected)
router.get("/profile", isAuthenticated, getProfile);

// Registration routes (protected)
router.post("/doctorRegistration", isAuthenticated, doctorRegistration);
router.post("/patientsRegistration", isAuthenticated, patientsRegistration);

// User data routes (protected)
router.get("/getpatients", isAuthenticated, getPatients);
router.get("/getdoctor", isAuthenticated, getDoctors);
router.get("/getalldoctor", isAuthenticated, getAllDoctors);

// Public routes
router.get("/public/doctors", getAllDoctors);

// Appointment routes (protected)
router.post("/createAppointment", isAuthenticated, createAppointment);
router.post("/getappointments", isAuthenticated, getAppointments);
router.get("/getPatientAppointments", isAuthenticated, getPatientAppointments);
router.get("/getDoctorAppointments", isAuthenticated, getDoctorAppointments);
router.put("/appointments/:appointmentId/cancel", isAuthenticated, cancelAppointment);
router.put("/appointments/:appointmentId/accept", isAuthenticated, acceptAppointment);
router.put("/appointments/:appointmentId/decline", isAuthenticated, declineAppointment);

export default router;