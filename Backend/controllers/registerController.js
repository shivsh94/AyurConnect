import Patients from "../models/patRegistration.js";
import Doctor from "../models/docRegistration.js";

export const doctorRegistration = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      gender,
      age,
      speciality,
      licence,
      clinic,
      Experience,
      uploadYourCertificate,
    } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not login" });
    }

    if (
      !name ||
      !phone ||
      !address ||
      !gender ||
      !age ||
      !speciality ||
      !licence ||
      !clinic ||
      !Experience ||
      !uploadYourCertificate
    ) {
      return res.status(400).json({ message: "All fields are required" });
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
      Experience,
      uploadYourCertificate,
    });
    const currentDoctor = await newDocRegistration.save();
    console.log(currentDoctor);

    res
      .status(200)
      .json({ message: "Doctor Registered Successfully", data: currentDoctor });
  } catch (error) {
    console.error("Error in doctor registration:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


export const patientsRegistration = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const { PatientName, phoneNo, address, age, height, weight } = req.body;

    if (!PatientName || !phoneNo || !address || !age || !height || !weight) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Step 1: Check if the user already registered the patient
    const existingPatient = await Patients.findOne({ userId: req.user._id });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: "You have already registered a patient. You cannot register again.",
        data: existingPatient
      });
    }

    // ✅ Step 2: If no patient exists, then create a new one
    const newPatient = new Patients({
      PatientName,
      phoneNo,
      address,
      age,
      height,
      weight,
      userId: req.user._id,
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
      error: error.message
    });
  }
};
