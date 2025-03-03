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
    const {
      PatientName,
      phoneNo,
      address,
      age,
      height,
      weight,
      bloodgroup,
      AnyMedicalHistory,
      AnyPreviousReport,
    } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not login" });
    }

    if (
      !PatientName ||
      !phoneNo ||
      !address ||
      !age ||
      !height ||
      !weight ||
      !bloodgroup ||
      !AnyMedicalHistory ||
      !AnyPreviousReport
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

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
    const currentPatients = await newPatientsRegistration.save();
    console.log(currentPatients);

    res
      .status(200)
      .json({
        message: "Patients Registered Successfully",
        data: currentPatients,
      });
  } catch (error) {
    console.error("Error in Paients registration:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
