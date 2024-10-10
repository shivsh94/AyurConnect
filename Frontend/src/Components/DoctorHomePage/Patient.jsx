import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Patient() {
  // State for handling sort dropdown visibility
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };

  return (
    <div>
      {/* Main Header Section */}
      <div className="w-full flex items-center justify-between h-36 bg-white ">
        {/* Logo Section */}
        <div className="flex items-center p-10 justify-between">
          <img
            width={120}
            height={120}
            src="./logo.png"
            alt="logo"
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
              to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
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

      {/* Main Content Section */}
      <div className="w-full flex flex-col items-center justify-start bg-blue-400 ">
        
        <div className="w-11/12 h-64 px-5 pt-7 ">
          <img
            src="./video.jpg"
            className="w-full h-full object-fit"
            alt="Video Preview"
          />
        </div>

        {/* Search and Sort/Filter Section */}
        <div className="w-11/12 px-5 py-7 grid grid-cols-6 gap-5 place-items-center place-content-start">
          {/* Search Bar */}
          <div className="relative col-span-4 w-full">
            <input
              type="text"
              placeholder="Search by Disease"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111 3a7.5 7.5 0 015.65 12.65z"
                ></path>
              </svg>
            </div>
          </div>

          {/* Sort Button with Dropdown */}
          <div className="relative w-full">
            <button
              className="text-lg border rounded-md px-2 py-2 pr-28"
              onClick={toggleSortDropdown}
            >
              Sort By :
            </button>
            {isSortOpen && (
              <div className="absolute w-full top-full left-0 mt-1 bg-white border rounded-md shadow-lg">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                     Sort by Popularity
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Option 2
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Option 3
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Filter Button */}
          <div className="w-full">
            <button className="text-lg border rounded-md px-2 py-2 pr-28">
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
