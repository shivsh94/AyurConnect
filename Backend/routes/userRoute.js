import express from "express";
import { sendEmailVerificationOTP, SignOut, Signup, verifyEmail } from "../controllers/userController.js";
import { SignIn } from "../controllers/userController.js";
import  doctorRegistration from  "../controllers/doctorController.js";
import patientsRegistration from "../controllers/patientsController.js";
import isAuthenticated from "../milldleware/isAuthenticated.js";
// import patientsRegistration from "../models/patientsRegistration.js";

const router = express.Router();

router.route("/signup").post(Signup);
router.route("/signin").post(SignIn);
router.route("/signout").get(SignOut);
router.route("/doctor-registration").post(isAuthenticated,doctorRegistration); 
router.route("/patients-registration").post(isAuthenticated,patientsRegistration); 
router.route("/send-otp").post(sendEmailVerificationOTP);
router.route("/check-otp").post(verifyEmail);



export default router;