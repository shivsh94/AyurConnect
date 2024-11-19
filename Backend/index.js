import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
dotenv.config({});


const app = express();  

const PORT = process.env.PORT || 3030;

app.use(express.json());

app.use("/api/v1/user",userRoute);
// app.use("/api/v1/user",);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});