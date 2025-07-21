// Security configuration for AyurConnect
export const securityConfig = {
  // JWT Configuration
  jwt: {
    accessTokenExpiry: '7d',
    refreshTokenExpiry: '30d',
    algorithm: 'HS256'
  },

  // Password Configuration
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  },

  // Rate Limiting Configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // Max requests per window
    authMaxRequests: 5, // Max auth requests per window
    otpMaxRequests: 3, // Max OTP requests per hour
    otpWindowMs: 60 * 60 * 1000 // 1 hour
  },

  // Account Lockout Configuration
  lockout: {
    maxAttempts: 5,
    lockDuration: 15 * 60 * 1000, // 15 minutes
    resetAfter: 15 * 60 * 1000 // Reset attempts after 15 minutes
  },

  // OTP Configuration
  otp: {
    length: 6,
    expiry: 10 * 60 * 1000, // 10 minutes
    maxAttempts: 3
  },

  // Cookie Configuration
  cookies: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: {
      accessToken: 7 * 24 * 60 * 60 * 1000, // 7 days
      refreshToken: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  },

  // CORS Configuration
  cors: {
    allowedOrigins: [
      process.env.CLIENT_URL || 'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400 // 24 hours
  },

  // Helmet Configuration
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  },

  // Database Configuration
  database: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    heartbeatFrequencyMS: 10000
  },

  // Email Configuration
  email: {
    rateLimit: 5, // Max 5 emails per second
    rateDelta: 1000, // Per second
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  }
};

// Generate OTP function
export const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

// Password validation function
export const validatePassword = (password) => {
  const { minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars } = securityConfig.password;
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email validation function
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate secure random string
export const generateSecureToken = (length = 32) => {
  return require('crypto').randomBytes(length).toString('hex');
};

// Sanitize user input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .trim();
}; 