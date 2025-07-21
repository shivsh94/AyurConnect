const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3030";
const API_VERSION = "v1";
const API_PREFIX = "user";

export const API_ENDPOINTS = {
  // Authentication
  SIGNIN: `/api/${API_VERSION}/${API_PREFIX}/signin`,
  SIGNOUT: `/api/${API_VERSION}/${API_PREFIX}/signout`,
  SEND_OTP: `/api/${API_VERSION}/${API_PREFIX}/send-otp`,
  VERIFY_EMAIL: `/api/${API_VERSION}/${API_PREFIX}/verifyEmail`,
  CREATE_USER: `/api/${API_VERSION}/${API_PREFIX}/createUserAfterVerification`,
  
  // Registration
  DOCTOR_REGISTRATION: `/api/${API_VERSION}/${API_PREFIX}/doctorRegistration`,
  PATIENT_REGISTRATION: `/api/${API_VERSION}/${API_PREFIX}/patientsRegistration`,
  
  // Data Fetching
  GET_PATIENTS: `/api/${API_VERSION}/${API_PREFIX}/getpatients`,
  GET_DOCTORS: `/api/${API_VERSION}/${API_PREFIX}/getdoctor`,
  GET_ALL_DOCTORS: `/api/${API_VERSION}/${API_PREFIX}/getalldoctor`,
  
  // Appointments
  CREATE_APPOINTMENT: `/api/${API_VERSION}/${API_PREFIX}/createAppointment`,
  GET_APPOINTMENTS: `/api/${API_VERSION}/${API_PREFIX}/getappointments`,
  GET_PATIENT_APPOINTMENTS: `/api/${API_VERSION}/${API_PREFIX}/getPatientAppointments`,
  GET_DOCTOR_APPOINTMENTS: `/api/${API_VERSION}/${API_PREFIX}/getDoctorAppointments`,
};

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  WITH_CREDENTIALS: true,
  TIMEOUT: 10000,
}; 