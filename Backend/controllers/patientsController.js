import patientsRegistration from "../models/patientsRegistration";

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


    res.status(200).json({ message: "Patient Registered Successfully" });

  } catch (error) {
    console.log(error);
  }
};
