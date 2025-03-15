import Doctor from "../models/docRegistration.js";
import Patients from "../models/patRegistration.js";
import jwt from "jsonwebtoken";

export const doctorRegistration = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const {
      name,
      phone,
      address,
      gender,
      age,
      speciality,
      licence,
      clinic,
      experience, 
    } = req.body;

    if (!name || !phone || !address || !gender || !age || !speciality || !licence || !clinic || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingDoctor = await Doctor.findOne({ userId: user._id });

    if (existingDoctor) {
      return res.status(400).json({
        message: "You have already registered a doctor. You cannot register again.",
        data: existingDoctor,
      });
    }

    const newDocRegistration = new Doctor({
      name,
      phone,
      address,
      gender,
      age,
      speciality,
      licence,
      clinic,
      experience, 
      userId: user.id,
    });

    const currentDoctor = await newDocRegistration.save();
    console.log(currentDoctor);

    res.status(200).json({success:true, message: "Doctor Registered Successfully", data: currentDoctor });
  } catch (error) {
    console.error("Error in doctor registration:", error);
    res.status(500).json({success:false, message: "Internal Server Error", error: error.message });
  }
};


export const patientsRegistration = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    const { PatientName, phoneNo, address, age, height, weight } = req.body;

    if (!PatientName || !phoneNo || !address || !age || !height || !weight) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingPatient = await Patients.findOne({ userId: req.user._id });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message:
          "You have already registered a patient. You cannot register again.",
        data: existingPatient,
      });
    }

    const newPatient = new Patients({
      PatientName,
      phoneNo,
      address,
      age,
      height,
      weight,
      userId: req.user.id,
    });

    await newPatient.save();

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      data: newPatient,
    });
  } catch (error) {
    console.error("Error in patient registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getPatients = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }
    const patients = await Patients.findOne({ userId: req.user.id });
    if (!patients) {
      return res.status(404).json({
        success: false,
        message: "No patients found for this user",
      });
    }
    const patient_details = jwt.sign(
      { data: patients },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("Patients", patient_details, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({
      success: true,
      message: "Patients fetched successfully",
      patient_details,
      data: patients,
    });
  } catch (error) {
    console.error("Error in fetching patients:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getDoctors = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }
    const doctors = await Doctor.findOne({ userId: req.user.id });
    if (!doctors) {
      return res.status(404).json({
        success: false,
        message: "No doctors found for this user",
      });
    }
    const doctor_details = jwt.sign(
      { data: doctors },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("Doctors", doctor_details, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctor_details,
      data: doctors,
    });
  } catch (error) {
    console.error("Error in fetching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

