import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
