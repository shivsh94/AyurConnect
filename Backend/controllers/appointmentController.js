import Appointment from "../models/appointmentSchema.js";
 

export const createAppointment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    let { doctorId, appointmentTime, appointmentDate } = req.body;

    if (!doctorId || !appointmentTime || !appointmentDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    appointmentDate = new Date(appointmentDate);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: "Invalid appointment date format" });
    }

    const [hours, minutes, period] = appointmentTime.match(/(\d+):(\d+) (AM|PM)/).slice(1);

    let hours24 = parseInt(hours);
    if (period === "PM" && hours24 !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    appointmentDate.setHours(hours24, parseInt(minutes));

    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentTime: appointmentDate,
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
      appointmentTime: appointmentDate,
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

export const getAppointments = async (req, res) => {
  try {  
    const data = req.body;
    console.log(data);
    
    const doctorId = data.doctorId;
    const appointments = await Appointment.find({ doctorId: doctorId });

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
