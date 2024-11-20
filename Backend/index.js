import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config({});


const app = express();  

const PORT = process.env.PORT || 3030;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));



app.use("/api/v1/user",userRoute);
// app.use("/api/v1/user",);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});