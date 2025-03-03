import React from 'react'
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';

const navList = [
  {
    name: "Home",
    link: "/dashboard",
  },
  {
    name: "Appointments",
    link: "/appointments",
  },
  {
    name: "Prescriptions",
    link: "/prescriptions",
  },
  {
    name: "Reports",
    link: "/reports",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
]

function Navbar() {

  return (
    <div>
     <div className="w-full flex items-center justify-between h-36 bg-black ">
        {/* Logo Section */}
        <div className="flex items-center p-10 justify-between">
        <Link to="/patient/dashboard">
          
          <img
            width={120}
            height={120}
            src={logo}
            alt="logo"
            className="rounded-full"
          />
            </Link>
        </div>

        {/* Navbar Links */}
        <div className="flex gap-5 text-[20px] pr-10 tracking-wider">
          {
          navList.map((item, index) => (
            <NavLink
            to={`/patient${item.link}`} 
              key={index}
              className="hover:text-blue-400 transition-colors duration-200"
            >
              {item.name}
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
