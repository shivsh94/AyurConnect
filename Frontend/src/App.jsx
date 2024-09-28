import './App.css';
import HomePage from "./Components/HomePage";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Registrarion from './Components/Registrarion';
 


function App() {
   

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/SignIn" element={<SignIn/>}/>
      <Route path='/registration' element={<Registrarion/>}/>
      <Route path='/*' element={<div>404 Error</div>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
