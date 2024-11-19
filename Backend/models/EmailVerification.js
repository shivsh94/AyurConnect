import mongoose from "mongoose";

const emailVerificationModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m' 
    }
});

const EmailVerification = mongoose.model("EmailVerification", emailVerificationModel);

export default EmailVerification;
