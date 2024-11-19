import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";

export const Signup = async (req, res) => {
    // Request body will contain email, password and otp

    try {
        const { email, password, confirmPassword } = req.body;
        // Check if all fields are present
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
         // Check if email already exists
        const user  = await User.findOne({ email });
        if (user) {
        return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        await User.create({ 
            email,
            // otp,
            password: hashedPassword,
            // isVerified: false
        });
        sendEmailVerificationOTP(req, User);


         
    } catch (error) {
        console.log(error);
    }
}
    
   