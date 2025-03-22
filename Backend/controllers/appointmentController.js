import Appointment from "../models/appointmentSchema.js";

export const createAppointment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    const { doctorId, appointmentTime, appointmentDate } = req.body;

    if (!doctorId || !appointmentTime || !appointmentDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentTime,
      appointmentDate,
    });
    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Slot already booked. Please choose another slot",
        data: existingAppointment,
      });
    }
    const newAppointment = new Appointment({
      doctorId,
      patientId: user._id,
      appointmentTime,
      appointmentDate,
    });
    await newAppointment.save();
    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error in creating appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
