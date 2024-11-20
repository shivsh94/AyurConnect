import mongoose from "mongoose";

const patientRegistration = new mongoose.Schema({
   "Patient's name": {
        type: String,
        required: true
    },
    "phone no": {
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
    "Any medical history": {
        type: String,
        // required: true
    },
    "Any previous report": {
        type: String,
        // required: true
        }
    });
    
export default mongoose.model("patientRegistration", patientRegistration);
