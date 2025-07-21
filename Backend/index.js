import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import configurations and routes
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';

// Import security middleware
import { 
  createRateLimiters, 
  speedLimiter, 
  corsOptions, 
  helmetConfig,
  sanitizeRequest,
  securityHeaders,
  requestLogger
} from './middleware/security.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create rate limiters
const { generalLimiter, authLimiter, otpLimiter } = createRateLimiters();

// Trust proxy for proper IP detection
app.set('trust proxy', 1);

// Security middleware (order matters!)
app.use(helmetConfig);
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(speedLimiter);
app.use(generalLimiter);

// Request logging
app.use(requestLogger);

// Request sanitization
app.use(sanitizeRequest);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Apply specific rate limiters to routes
app.use('/api/v1/user/signin', authLimiter);
app.use('/api/v1/user/send-otp', otpLimiter);
app.use('/api/v1/user/verifyEmail', otpLimiter);

// Routes
app.use("/api/v1/user", userRoute);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "AyurConnect API is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API status endpoint
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "API is operational",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Route not found",
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Global error handler:', {
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value"
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: "Token expired"
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? "Internal server error" 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const startServer = async () => {
  try {
    // Try to connect to database
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📱 Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔧 Development mode - some features may be limited without database`);
      }
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      
      server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('🚨 Uncaught Exception:', err);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
