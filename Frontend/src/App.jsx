import './App.css';
import Home from "./Components/PatientHomePage/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Registrarion from  './Components/Register/Registrarion';
import Doctor from './Components/DoctorHomePage/Doctor';
// import Video from './Components/PatientHomePage/Video';
import PatientHome from './Components/PatientHomePage/PatientHome';
import AboutUs from './Components/PatientHomePage/AboutUs';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DocHome from './Components/DoctorHomePage/DocHome';
import DoctorProfile from './Components/Profile/doctorProfile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/registration" element={<Registrarion />} />
        {/* <Route path="/Profile/:id" element={<DoctorProfile />} /> */}

        <Route path="/Profile/*" element={<Home />}>
          <Route path=":id" element={<DoctorProfile />} />
        </Route>
        
        {/* Parent route for Patient */}
        <Route path="/Patient/*" element={<Home />}>
          <Route path="dashboard" element={<PatientHome/>} />
          <Route path="about-us" element={<AboutUs />} />

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
