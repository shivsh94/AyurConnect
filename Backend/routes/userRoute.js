import express from "express";
import { Signup } from "../controllers/userController.js";

const router = express.Router();

router.route("/signup").post(Signup);

// router.route("/sendOtp").post;

export default router;