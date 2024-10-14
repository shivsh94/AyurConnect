import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';

function Navbar() {
  return (
    <div>
     <div className="w-full flex items-center justify-between h-36 bg-black ">
        {/* Logo Section */}
        <div className="flex items-center p-10 justify-between">
          <img
            width={120}
            height={120}
            src={logo}
            alt="logo       "
            className="rounded-full"
          />
        </div>

        {/* Navbar Links */}
        <div className="flex gap-5 text-[20px] pr-10 tracking-wider">
          {[
            "Home",
            "Video Consultation",
            "Our Services",
            "About Us",
            "Contact Us",
            "Blog",
          ].map((item, index) => (
            <NavLink
            to={`/Patient/${item.toLowerCase().replace(/\s+/g, '-')}`} 
              key={index}
              className="hover:text-blue-400 transition-colors duration-200"
            >
              {item}
            </NavLink>
          ))}
          <div className="text-1xl">
            <NavLink to="/user">Patient's Name</NavLink>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
