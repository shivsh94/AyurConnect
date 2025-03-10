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
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    // Destructure request body
    const {
      PatientName,
      phoneNo,
      address,
      age,
      height,
      weight,
      bloodgroup,
      AnyMedicalHistory = "", // Default to empty string if not provided
      AnyPreviousReport = "",
    } = req.body;

    // Validate required fields
    if (!PatientName || !phoneNo || !address || !age || !height || !weight || !bloodgroup) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Validate phone number (optional: Adjust regex as per your region)
    const phoneRegex = /^[0-9]{10}$/; // Example for a 10-digit phone number
    if (!phoneRegex.test(phoneNo)) {
      return res.status(400).json({ message: "Invalid phone number format." });
    }

    // Create a new patient record
    const newPatientsRegistration = new Patients({
      PatientName,
      phoneNo,
      address,
      age,
      height,
      weight,
      bloodgroup,
      AnyMedicalHistory,
      AnyPreviousReport,
    });

    // Save to database
    const savedPatient = await newPatientsRegistration.save();

    // Respond with success message
    res.status(201).json({
      message: "Patient registered successfully",
      data: savedPatient,
    });

  } catch (error) {
    console.error("Error in patient registration:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
