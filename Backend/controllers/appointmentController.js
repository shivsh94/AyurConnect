import Appointment from "../models/appointmentSchema.js";
import Doctor from "../models/docRegistration.js";
import Patients from "../models/patRegistration.js";
import crypto from "crypto";

// Generate unique meeting ID
const generateMeetingId = (appointmentId) => {
  const hash = crypto.createHash('md5').update(appointmentId.toString()).digest('hex');
  return `ayurconnect-${hash.substring(0, 12)}`;
};

// Generate Jitsi meeting URL
const generateMeetingUrl = (meetingId) => {
  return `https://meet.jit.si/${meetingId}`;
};

export const createAppointment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    let { doctorId, appointmentTime, appointmentDate, reason } = req.body;

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
      reason: reason || ''
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
      type: 'Consultation',
      meetingId: appointment.meetingId,
      meetingUrl: appointment.meetingUrl,
      meetingStatus: appointment.meetingStatus,
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
        type: 'Consultation',
        meetingId: appointment.meetingId,
        meetingUrl: appointment.meetingUrl,
        meetingStatus: appointment.meetingStatus,
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
    
    // Generate meeting link when appointment is confirmed
    if (!appointment.meetingId) {
      const meetingId = generateMeetingId(appointment._id);
      appointment.meetingId = meetingId;
      appointment.meetingUrl = generateMeetingUrl(meetingId);
    }
    
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

// Get meeting details for an appointment
export const getMeetingDetails = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized: User not logged in" 
      });
    }

    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId)
      .populate('doctorId', 'name speciality')
      .populate('patientId', 'email');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Get patient and doctor data
    const patientData = await Patients.findOne({ userId: appointment.patientId._id });
    const doctor = await Doctor.findById(appointment.doctorId._id);

    // Verify user has access to this appointment
    const isPatient = appointment.patientId._id.toString() === user._id.toString();
    const isDoctor = doctor && doctor.userId.toString() === user._id.toString();

    if (!isPatient && !isDoctor) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to access this appointment",
      });
    }

    // Check if appointment is confirmed
    if (appointment.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: "Meeting is only available for confirmed appointments",
      });
    }

    // Check if meeting link exists
    if (!appointment.meetingId || !appointment.meetingUrl) {
      return res.status(400).json({
        success: false,
        message: "Meeting link not generated yet",
      });
    }

    // Check if appointment time is valid (can join 10 minutes before)
    const appointmentTime = new Date(appointment.appointmentTime);
    const now = new Date();
    const tenMinutesBefore = new Date(appointmentTime.getTime() - 10 * 60 * 1000);
    const twoHoursAfter = new Date(appointmentTime.getTime() + 2 * 60 * 60 * 1000);

    if (now < tenMinutesBefore) {
      return res.status(400).json({
        success: false,
        message: "Meeting can only be joined 10 minutes before scheduled time",
        canJoinAt: tenMinutesBefore,
      });
    }

    if (now > twoHoursAfter && appointment.meetingStatus !== 'ongoing') {
      return res.status(400).json({
        success: false,
        message: "Meeting time has expired",
      });
    }

    res.status(200).json({
      success: true,
      message: "Meeting details fetched successfully",
      data: {
        appointmentId: appointment._id,
        meetingId: appointment.meetingId,
        meetingUrl: appointment.meetingUrl,
        meetingStatus: appointment.meetingStatus,
        appointmentTime: appointment.appointmentTime,
        doctorName: appointment.doctorId?.name || 'Doctor',
        patientName: patientData?.PatientName || 'Patient',
        userRole: isDoctor ? 'doctor' : 'patient',
      },
    });
  } catch (error) {
    console.error("Error in getting meeting details:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Start meeting
export const startMeeting = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized: User not logged in" 
      });
    }

    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: "Only confirmed appointments can start meetings",
      });
    }

    // Update meeting status
    appointment.meetingStatus = 'ongoing';
    if (!appointment.meetingStartedAt) {
      appointment.meetingStartedAt = new Date();
    }
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Meeting started successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error in starting meeting:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// End meeting
export const endMeeting = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized: User not logged in" 
      });
    }

    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Update meeting status
    appointment.meetingStatus = 'ended';
    appointment.meetingEndedAt = new Date();
    appointment.status = 'completed';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Meeting ended successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error in ending meeting:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
