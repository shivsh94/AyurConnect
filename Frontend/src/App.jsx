import './App.css';
import Patient from "./Components/DoctorHomePage/Patient";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Registrarion from  './Components/Register/Registrarion';
import Doctor from './Components/DoctorHomePage/Doctor'; 

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/SignIn" element={<SignIn/>}/>
      <Route path='/registration' element={<Registrarion/>}/>
      <Route path='/Patient' element={<Patient/>}/>
      <Route path='/Doctor' element={<Doctor/>}/>
      {/* <Route path='/request' element={<RequestedAppointments/>}/> */}
      <Route path='/*' element={<div>404 Error</div>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
