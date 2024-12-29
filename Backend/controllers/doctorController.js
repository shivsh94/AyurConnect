import Doctor from "../models/docRegistration.js";
import cookie from "cookie-parser";



const doctorRegistration = async (req, res) => {
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
    
    res.status(200).json({ message: "Doctor Registered Successfully", data: currentDoctor });
  } catch (error) {
    console.error("Error in doctor registration:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
export default doctorRegistration;