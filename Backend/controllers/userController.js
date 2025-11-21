import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPEmail, isEmailServiceAvailable } from "../config/emailConfig.js";
import { generateOTP, validatePassword, sanitizeInput } from "../config/security.js";

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId }, // Changed from userId to id to match middleware
    process.env.JWT_SECRET_KEY,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: userId }, // Changed from userId to id to match middleware
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET_KEY,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};

// Set secure cookies
const setAuthCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Use 'lax' in development
    path: '/'
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

// User registration
export const signup = async (req, res) => {
  try {
    const { name, email, password, role = 'patient' } = req.body;

    // Input validation and sanitization
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password validation failed",
        errors: passwordValidation.errors
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user - password will be hashed by the pre-save hook in the model
    const user = new User({
      name: sanitizedName,
      email: sanitizedEmail,
      password: password, // Don't hash here - let the model's pre-save hook handle it
      role,
      isDoctor: role === 'doctor', // Set isDoctor based on role
      otp,
      otpExpiry,
      isEmailVerified: true, // Auto-verify for better UX (can change to false when email is configured)
      isVerified: true // Allow access to protected routes
    });

    await user.save();

    // Send OTP email if email service is available
    if (isEmailServiceAvailable()) {
      const emailResult = await sendOTPEmail(sanitizedEmail, otp);
      if (!emailResult.success) {
        console.log('⚠️ Failed to send OTP email, but user created successfully');
      }
    } else {
      console.log('⚠️ Email service disabled - OTP:', otp);
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      ...(process.env.NODE_ENV === 'development' && !isEmailServiceAvailable() && {
        debug: { otp }
      })
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// User login
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Find user
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check if account is locked
    if (user.isLocked && user.lockUntil > Date.now()) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      return res.status(423).json({
        success: false,
        message: `Account is locked. Try again in ${remainingTime} minutes.`
      });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    
    if (!isPasswordValid) {
      // Increment failed attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      
      // Lock account after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {
        user.isLocked = true;
        user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();
        
        return res.status(423).json({
          success: false,
          message: "Account locked due to too many failed attempts. Try again in 15 minutes."
        });
      }
      
      await user.save();
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.isLocked = false;
    user.lockUntil = null;
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.isDoctor ? 'doctor' : 'patient',
        isDoctor: user.isDoctor,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Send OTP for email verification
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const user = await User.findOne({ email: sanitizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email if email service is available
    if (isEmailServiceAvailable()) {
      const emailResult = await sendOTPEmail(sanitizedEmail, otp);
      if (emailResult.success) {
        res.status(200).json({
          success: true,
          message: "OTP sent successfully"
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send OTP email"
        });
      }
    } else {
      // In development, return OTP in response
      res.status(200).json({
        success: true,
        message: "OTP generated successfully",
        ...(process.env.NODE_ENV === 'development' && {
          debug: { otp }
        })
      });
    }

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Verify email with OTP
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const user = await User.findOne({ email: sanitizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if OTP is expired
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Refresh token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found"
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    // Set new cookies
    setAuthCookies(res, accessToken, newRefreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully"
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -otp -otpExpiry');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
