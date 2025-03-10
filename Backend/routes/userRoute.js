import express from "express";
import { sendEmailVerificationOTP, SignOut, Signup, verifyEmail } from "../controllers/userController.js";
import { SignIn } from "../controllers/userController.js";
import {doctorRegistration} from "../controllers/registerController.js";
import {patientsRegistration} from "../controllers/registerController.js";
import isAuthenticated from "../milldleware/isAuthenticated.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);
router.post("/signout", SignOut);
router.post("/sendEmailVerificationOTP", sendEmailVerificationOTP);
router.post("/verifyEmail", verifyEmail);
router.post("/doctorRegistration",isAuthenticated, doctorRegistration);
router.post("/patientsRegistration",isAuthenticated, patientsRegistration);



export default router;