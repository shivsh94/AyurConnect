import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error("MongoDB connection string is not defined in environment variables");
    }

    // Enhanced connection options for security and performance
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket operations
      // Security options for MongoDB Atlas
      ssl: true,
      // Connection timeout
      connectTimeoutMS: 10000,
      // Heartbeat frequency
      heartbeatFrequencyMS: 10000,
    };

    await mongoose.connect(mongoURI, options);
    
    console.log("✅ MongoDB connected successfully");
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("💡 Please make sure MongoDB is installed and running:");
    console.log("   1. Install MongoDB: https://docs.mongodb.com/manual/installation/");
    console.log("   2. Start MongoDB service");
    console.log("   3. Check your MONGODB_URI in .env file");
    
    // In development, we can continue without MongoDB for testing other features
    if (process.env.NODE_ENV === 'development') {
      console.log("⚠️ Continuing in development mode without database...");
      return;
    }
    
    process.exit(1);
  }
};

export default connectDB;
