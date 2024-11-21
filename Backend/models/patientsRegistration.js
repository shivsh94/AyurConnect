import mongoose from "mongoose";

const patientRegistration = new mongoose.Schema({
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
        type:Number,
        // required:true
    },
    weight :{
        type:Number,
        // required:true
    },
    bloodgroup :{
        type:String,
        
    },
    gender :{
        type:String,
        required:true
    },
    disease :{
        type:String,
        required:true
    },
    AnyMedicalHistory: {
        type: String,
        // required: true
    },
    AnyPreviousReport: {
        type: String,
        // required: true
        }
    });
    
export default mongoose.model("PatientRegistration", patientRegistration);
