import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

// Rate limiting for failed authentication attempts
const failedAttempts = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

const isAuthenticated = async (req, res, next) => {
  try {
    // Get client IP for rate limiting
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    
    // Check if IP is blocked due to too many failed attempts
    const failedAttempt = failedAttempts.get(clientIP);
    if (failedAttempt && failedAttempt.count >= MAX_FAILED_ATTEMPTS) {
      const timeSinceFirstAttempt = Date.now() - failedAttempt.firstAttempt;
      if (timeSinceFirstAttempt < BLOCK_DURATION) {
        return res.status(429).json({ 
          success: false,
          message: "Too many failed authentication attempts. Please try again later.",
          retryAfter: Math.ceil((BLOCK_DURATION - timeSinceFirstAttempt) / 1000)
        });
      } else {
        // Reset failed attempts after block duration
        failedAttempts.delete(clientIP);
      }
    }

    // Extract token from cookies or Authorization header
    const token = req.cookies?.token || 
                  (req.headers?.authorization && req.headers.authorization.startsWith('Bearer ') 
                    ? req.headers.authorization.split(" ")[1] 
                    : null);
    
    if (!token) {
      recordFailedAttempt(clientIP);
      return res.status(401).json({ 
        success: false,
        message: "Access denied. No token provided." 
      });
    }
     
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Check if user exists and is active
    const user = await User.findById(decoded.id).select('-password -refreshToken -otp -otpExpiry');
    if (!user) {
      recordFailedAttempt(clientIP);
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Check if user account is active
    if (!user.isActive) {
      recordFailedAttempt(clientIP);
      return res.status(403).json({ 
        success: false,
        message: "Account is deactivated. Please contact support." 
      });
    }

    // Check if user is verified (for sensitive operations)
    if (!user.isVerified) {
      return res.status(403).json({ 
        success: false,
        message: "Email verification required." 
      });
    }

    // Add user to request object (without sensitive data)
    req.user = user;
    
    // Reset failed attempts on successful authentication
    failedAttempts.delete(clientIP);
    
    next();
  } catch (error) {
    const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    recordFailedAttempt(clientIP);
    
    console.error("JWT verification error:", error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Token expired. Please login again." 
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        success: false,
        message: "Invalid token." 
      });
    } else {
      return res.status(500).json({ 
        success: false,
        message: "Authentication error." 
      });
    }
  }
};

// Record failed authentication attempts
const recordFailedAttempt = (clientIP) => {
  const now = Date.now();
  const attempt = failedAttempts.get(clientIP);
  
  if (attempt) {
    // Check if we should reset the counter (first attempt was more than block duration ago)
    if (now - attempt.firstAttempt > BLOCK_DURATION) {
      failedAttempts.set(clientIP, { count: 1, firstAttempt: now });
    } else {
      attempt.count += 1;
    }
  } else {
    failedAttempts.set(clientIP, { count: 1, firstAttempt: now });
  }
};

// Clean up old failed attempts periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, attempt] of failedAttempts.entries()) {
    if (now - attempt.firstAttempt > BLOCK_DURATION) {
      failedAttempts.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

export default isAuthenticated;
