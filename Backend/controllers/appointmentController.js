import Appointment from "../models/appointmentSchema.js";
import Doctor from "../models/docRegistration.js";
import Patients from "../models/patRegistration.js";

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
    console.log( "data",data);
    
    const doctorId = data.doctorId;
    const appointments = await Appointment.find({ doctorId: doctorId });

    return res.status(200).json({
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

export const getPatientAppointments = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const appointments = await Appointment.find({ patientId: user._id })
      .populate('doctorId', 'name speciality clinic phone')
      .sort({ appointmentTime: 1 });

    const formattedAppointments = appointments.map(appointment => ({
      _id: appointment._id,
      appointmentTime: appointment.appointmentTime,
      status: appointment.status,
      doctorName: appointment.doctorId?.name || 'Unknown',
      speciality: appointment.doctorId?.speciality || 'General Medicine',
      clinic: appointment.doctorId?.clinic || 'Not specified',
      doctorPhone: appointment.doctorId?.phone || 'Not available',
      type: 'Consultation'
    }));

    res.status(200).json({
      success: true,
      message: "Patient appointments fetched successfully",
      data: formattedAppointments,
    });
  } catch (error) {
    console.error("Error in fetching patient appointments:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    // First, get the doctor's information
    const doctor = await Doctor.findOne({ userId: user._id });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate('patientId', 'email')
      .sort({ appointmentTime: 1 });

    // Get patient data for all appointments
    const formattedAppointments = await Promise.all(appointments.map(async (appointment) => {
      // Find patient data from Patients collection using userId
      const patientData = await Patients.findOne({ userId: appointment.patientId._id });
      
      return {
        _id: appointment._id,
        appointmentTime: appointment.appointmentTime,
        appointmentDate: appointment.appointmentDate,
        status: appointment.status || 'pending',
        createdAt: appointment.createdAt,
        patientName: patientData?.PatientName || 'Unknown Patient',
        patientEmail: appointment.patientId?.email || 'Not available',
        patientPhone: patientData?.phoneNo?.toString() || 'Not available',
        patientAge: patientData?.age?.toString() || 'Not available',
        patientGender: patientData?.gender || 'Not available',
        speciality: doctor.speciality,
        clinic: doctor.clinic,
        type: 'Consultation'
      };
    }));

    res.status(200).json({
      success: true,
      message: "Doctor appointments fetched successfully",
      data: formattedAppointments,
    });
  } catch (error) {
    console.error("Error in fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check if the user is the patient who booked the appointment
    if (appointment.patientId.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own appointments",
      });
    }

    // Check if appointment can be cancelled (not already cancelled or completed)
    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    if (appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel a completed appointment",
      });
    }

    // Update appointment status to cancelled
    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error in cancelling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const acceptAppointment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const { appointmentId } = req.params;

    // First, get the doctor's information
    const doctor = await Doctor.findOne({ userId: user._id });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check if the appointment belongs to this doctor
    if (appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only accept appointments for your own profile",
      });
    }

    // Check if appointment can be accepted
    if (appointment.status === 'confirmed') {
      return res.status(400).json({
        success: false,
        message: "Appointment is already confirmed",
      });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: "Cannot accept a cancelled appointment",
      });
    }

    // Update appointment status to confirmed
    appointment.status = 'confirmed';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment accepted successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error in accepting appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const declineAppointment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const { appointmentId } = req.params;

    // First, get the doctor's information
    const doctor = await Doctor.findOne({ userId: user._id });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check if the appointment belongs to this doctor
    if (appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only decline appointments for your own profile",
      });
    }

    // Check if appointment can be declined
    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    if (appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: "Cannot decline a completed appointment",
      });
    }

    // Update appointment status to cancelled
    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment declined successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error in declining appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

