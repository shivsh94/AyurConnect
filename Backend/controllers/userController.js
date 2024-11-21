import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import transport from "../config/emailConfig.js";
// import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";

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
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      email,
      // otp,
      password: hashedPassword,
      // isVerified: false
    });
    return res.json({ message: "User signed up successfully",
        success: true,
        user: newUser,
     });
    // sendEmailVerificationOTP(req, User);
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if all fields are present
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("a");
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }
    // Compare password
    console.log("b");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" , success: false});
    }

    console.log("c");
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log("d");
    return res.status(200).cookie("token", token).json({ _id: user._id, message: "User signed in successfully", success: true });

  } catch (error) {
    console.log(error);
  }
};
export const SignOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "User signed out successfully" });
  }
  catch (error) {
    console.log(error);
    } 
    };

// export const ForgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     // Check if email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User does not exist" });
//     }
//     // Generate OTP
//     // Send OTP to email

//     sendEmailVerificationOTP(req, User);
//     res.json({ message: "OTP sent to your email" });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const ResetPassword = async (req, res) => {
//   try {
//     const { otp, newPassword } = req.body;
//     // Check if OTP is valid
//     const user = await User.findOne({ otp });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }
//     // Hash password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     // Update password
//     user.password = hashedPassword;
//     await user.save;
//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.log(error);
//   }
// };


export const sendEmailVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if(user.isVerified){
      return res.status(400).json({ message: "Email is already verified" });
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Send OTP to email
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    // });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}`,
    };
    await transport.sendMail(mailOptions);
    // Save OTP in user document
    user.otp = otp;
    await user.save();
    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { otp,email } = req.body;
    
    const existUser = await User.findOne({email});

    if(!existUser){
      return res.status(400).json({message:"Please signup first", success:false});
    }

    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP", success:false  });
    }

    if(user.otp != existUser.otp){
      return res.status(400).json({ message: "Invalid OTP", success:false  });
    }

    user.otp = null;
    user.isVerified = true;
    await user.save();
    res.json({ message: "Email verified successfully", success:true });
  } catch (error) {
    console.log(error);
  }
};
