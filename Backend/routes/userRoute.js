import express from "express";
import { sendEmailVerificationOTP, SignOut, Signup, verifyEmail } from "../controllers/userController.js";
import { SignIn } from "../controllers/userController.js";
import {doctorRegistration} from "../controllers/registerController.js";
import {patientsRegistration} from "../controllers/registerController.js";
import isAuthenticated from "../milldleware/isAuthenticated.js";

const router = express.Router();

router.route("/signup").post(Signup);
router.route("/signin").post(SignIn);
router.route("/signout").get(SignOut);
router.route("/doctor-registration").post(isAuthenticated,doctorRegistration); 
router.route("/patients-registration").post(isAuthenticated,patientsRegistration); 
router.route("/send-otp").post(sendEmailVerificationOTP);
router.route("/check-otp").post(verifyEmail);



export default router;