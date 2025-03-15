import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { login } from '../../features/login/loginSlice';

function DocNavbar() {

  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.login.currentUser);

  useEffect(() => {

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/getdoctor");
        if (response.data.success) {
          console.log(response.data);
          dispatch(login(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center p-3 justify-between bg-black text-white">
        <div className="pl-10">
          <img width={80} height={80} src={logo} alt="logo" className="rounded-full " />
        </div>
        <div className="flex gap-5 text-[20px] pr-16 tracking-wider">
          {["Home", "Dashboard", "Patient List", "Patient History", "Blog"].map((item, index) => (
            <NavLink
              to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
              key={index}
              className="hover:text-green-300 hover:underline hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              {item}
            </NavLink>
          ))}
          <div className="text-1xl border-l-2 pl-10">
             <p className='border border-yellow-200 px-2 py-2 rounded-2xl font-bold'>Dr. {doctor.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocNavbar
