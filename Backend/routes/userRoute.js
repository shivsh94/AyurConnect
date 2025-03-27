import express from "express";
import { sendEmailVerificationOTP, SignOut, Signup, verifyEmail } from "../controllers/userController.js";
import { SignIn } from "../controllers/userController.js";
import {doctorRegistration, getAllDoctors, getDoctors, getPatients} from "../controllers/registerController.js";
import {patientsRegistration} from "../controllers/registerController.js";
import isAuthenticated from "../milldleware/isAuthenticated.js";
import { createAppointment, getAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);
router.post("/signout", SignOut);
router.post("/send-otp", sendEmailVerificationOTP);
router.post("/verifyEmail", verifyEmail);
router.post("/doctorRegistration",isAuthenticated, doctorRegistration);
router.post("/patientsRegistration",isAuthenticated, patientsRegistration);
router.get("/getpatients",isAuthenticated , getPatients);
router.get("/getdoctor",isAuthenticated , getDoctors);
router.get("/getalldoctor",isAuthenticated , getAllDoctors);
router.post("/createAppointment",isAuthenticated, createAppointment);
router.post("/getappointments",isAuthenticated , getAppointments);



export default router;