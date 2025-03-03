import React from "react";
import { NavLink } from "react-router-dom";

function DocFooter() {
  return (
    <div>
      <div className="w-full">
        <div className="grid grid-cols-5 text-center mt-20">
           
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl mb-7">Quick Links</h1>
            
            <div className="flex flex-col space-y-4 items-start">
              <NavLink to="/about-us" className="hover:text-green-500">
                About Us
              </NavLink>
              <NavLink to="/contact-us" className="hover:text-green-500">
                Contact Us
              </NavLink>
              <NavLink
                to="/terms-and-conditions"
                className="hover:text-green-500"
              >
                Blogs
              </NavLink>
              <NavLink to="/privacy-policy" className="hover:text-green-500">
                Video-consultation
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-14">
            <NavLink to="/home" className="hover:text-green-500">
              Home
            </NavLink>
            <NavLink to="/services" className="hover:text-green-500">
              Services
            </NavLink>
            {/* <NavLink to="/appointment" className="hover:text-green-500">Appointment</NavLink> */}
            <NavLink to="/team" className="hover:text-green-500">
              Our Team
            </NavLink>
            <NavLink to="/testimonials" className="hover:text-green-500">
              Testimonials
            </NavLink>
          </div>
          <div className="flex flex-col space-y-4 mt-14">
            <NavLink to="/support" className="hover:text-green-500">
              Support
            </NavLink>
            <NavLink to="/careers" className="hover:text-green-500">
              Careers
            </NavLink>
            <NavLink to="/policies" className="hover:text-green-500">
              Policies
            </NavLink>
            <NavLink to="/cencellation" className="hover:text-green-500">
              Cancellation & Refund
            </NavLink>
          </div>
          <div className="flex flex-col space-y-4 mt-14">
            <h1>Contact Detail</h1>
            <p>Phone: 1234567890</p>
            <p>Email:ayurconnect@gmail.com</p>
            <h1>Follow Us: </h1>
          </div>
          <div className="flex flex-col space-y-4 mt-14 mr-10">
            <h1>Registered Address:</h1>
            <h1>3/196 Viram Khand, Gomti Nagar,</h1>
            <h1>Lucknow-226010,Uttar Pradesh, India</h1>
            <h1>Corporate Office Address :</h1>
            <h1>3/196 Viram Khand, Gomti Nagar,</h1>
            <h1>Lucknow-226010,Uttar Pradesh, India</h1>
          </div>
        </div>
        <div className="text-gray-400 m-12">
          <hr className="border-gray-500 w-full" />
        </div>
        <div className="text-center text-gray-400 mb-16">
          <p>© 2021 AyurConnect. All Rights Reserved.</p>
          </div>
      </div>
    </div>
  );
}

export default DocFooter;
