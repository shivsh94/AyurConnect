import mongoose, { Schema } from "mongoose";

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        expires: 300 // 5 minutes
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        hide: true
    },
    confirmPassword: {
        type: String,
        // required: true,
        hide: true
    },
    patientDetails:{
        type: Schema.Types.ObjectId,
        ref: 'patientRegistration'
    },
    doctorDetails:{
        type: Schema.Types.ObjectId,
        ref: 'doctorRegistration'
    }
});

export default mongoose.model("User", userModel);