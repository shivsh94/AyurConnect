import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = (req, res, next) => {
  try {
    // Extract the token from cookies or authorization header
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the user to the request object
    req.user = decoded;

    // Move to the next middleware
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default isAuthenticated;
