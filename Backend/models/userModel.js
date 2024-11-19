import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    // otp: {
    //     type: String,
    //     required: true,
    //     createdAt: Date,
    //     expiresAt: Date
    // },
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // },
    password: {
        type: String,
        required: true,
        hide: true
    },
    confirmPassword: {
        type: String,
        // required: true,
        hide: true
    }
});

export default mongoose.model("User", userModel);