import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication Components
import Registration from './Components/Authentications/Register/Registration';
import SignIn from './Components/Authentications/SignIn';

// Page Components
import Homepage from './pages/Home/Homepage';
import Home from './pages/PatientHomePage/Home';
import DocHome from './pages/DoctorHomePage/DocHome';
import PatientHome from './pages/PatientHomePage/PatientHome';
import Doctor from './pages/DoctorHomePage/Doctor';
import DoctorProfile from './pages/DoctorHomePage/DoctorProfile';
import DoctorAppointments from './pages/DoctorHomePage/DoctorAppointments';
import Appointment from './pages/Appointment/appointment';
import AboutUs from './pages/PatientHomePage/AboutUs';
import PatientProfile from './Components/Profile/patientProfile';
import PatientAppointments from './pages/PatientHomePage/PatientAppointments';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

// 404 Error Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <a 
        href="/" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/registration" element={<Registration />} />

        {/* Patient Routes - Protected */}
        <Route path="/patient/*" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <Home />
          </ProtectedRoute>
        }>
          <Route index element={<PatientHome />} />
          <Route path="dashboard" element={<PatientHome />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path=":doctorId/appointments" element={<Appointment />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="appointments" element={<PatientAppointments />} />
        </Route>

        {/* Doctor Routes - Protected */}
        <Route path="/doctor/*" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DocHome />
          </ProtectedRoute>
        }>
          <Route index element={<Doctor />} />
          <Route path="Docdashboard" element={<Doctor />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<Doctor />} />
          <Route path="blogs" element={<Doctor />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
