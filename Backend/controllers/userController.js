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
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Compare password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.json({ message: "User signed in successfully",success: true });
    // Generate JWT
//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
  } catch (error) {
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
// export const sendEmailVerificationOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     // Send OTP to email
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//     });
//     const mailOptions = {
//       from: "your-email@gmail.com",
//       to: email,
//       subject: "Email Verification OTP",
//       text: `Your OTP is ${otp}`,
//     };
//     await transporter.sendMail(mailOptions);
//     // Save OTP in user document
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User does not exist" });
//     }
//     user.otp = otp;
//     await user.save;
//     res.json({ message: "OTP sent to your email" });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const verifyEmail = async (req, res) => {
//   try {
//     const { otp } = req.body;
//     // Check if OTP is valid
//     const user = await User.findOne({ otp });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }
//     // Remove OTP from user document
//     user.otp = null;
//     await user.save;
//     res.json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.log(error);
//   }
// };
