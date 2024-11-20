import express from "express";
import { Signup } from "../controllers/userController.js";
import { SignIn } from "../controllers/userController.js";
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";

const router = express.Router();

router.route("/signup").post(Signup);
router.route("/signin").post(SignIn);

router.route("/sendOtp").post(sendEmailVerificationOTP);



export default router;