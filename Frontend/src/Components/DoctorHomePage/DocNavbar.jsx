import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png';

function DocNavbar() {
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
          <div className="text-1xl">
            <NavLink to="/user">Doctor's Name</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocNavbar
