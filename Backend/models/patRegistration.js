import mongoose from "mongoose";

const patRegistration = new mongoose.Schema({
   PatientName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    address :{
        type:String,
        required:true
    },
    age :{
        type:Number,
        required:true
    },
    height :{
        type:Number
    },
    weight :{
        type:Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'   
    }
});

export default mongoose.model("Patients", patRegistration);
