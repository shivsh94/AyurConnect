import './App.css';
import Home from "./pages/PatientHomePage/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from './Components/Authentications/SignIn';
import SignUp from './Components/Authentications/SignUp';
import Registrarion from  './Components/Authentications/Register/Registrarion';
import Doctor from './pages/DoctorHomePage/Doctor';
// import Video from './Components/PatientHomePage/Video';
import PatientHome from './pages/PatientHomePage/PatientHome';
import AboutUs from './pages/PatientHomePage/AboutUs';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DocHome from './pages/DoctorHomePage/DocHome';
import DoctorProfile from './Components/Profile/doctorProfile';
import OtpPage from './Components/Authentications/Otp';
import Homepage from './pages/Home/Homepage';
import axios from 'axios';
import Appointment from './pages/Appointment/appointment';

axios.defaults.baseURL = "http://localhost:5000/api/v1/user";
axios.defaults.withCredentials = true;


function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/registration" element={<Registrarion />} />
        {/* <Route path="/Profile/:id" element={<DoctorProfile />} /> */}

        <Route path="/Profile/*" element={<Home />}>
          <Route path=":id" element={<DoctorProfile />} />
        </Route>
        
        {/* Parent route for Patient */}
        <Route path="/Patient/*" element={<Home />}>
          <Route path="dashboard" element={<PatientHome/>} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="appointments" element={<Appointment/>} />

          {/* <Route path="video" element={<Video/>} /> */}
        </Route>

        <Route path="/Doctor/*" element={<DocHome />} >
          <Route path="Docdashboard" element={<Doctor />} />
        </Route>
        
        {/* Fallback route for 404 */}
        <Route path="*" element={<div>404 Error - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
