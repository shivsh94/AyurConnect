import React, { useState } from "react";
import Disease from "./Disease";
import DoctorCards from "./DoctorCards";
import ImageCarousel from "./ImageCarousel";

function PatientHome() {
  // State for handling sort dropdown visibility
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };

  const [searchTerm, setSearchTerm] = useState("");
  // Filter the desease based on the search term

  return (
    <div>
      {/* Main Content Section */}
      <div className=" px-16 mt-5">
        <ImageCarousel />
      </div>
      <div className="w-full flex flex-col items-center justify-start bg-black">
        {/* Search and Sort/Filter Section */}
        <div className="w-11/12 px-5 py-7 grid grid-cols-6 gap-5 place-items-center place-content-start">
          {/* Search Bar */}
          <div className="relative col-span-4 w-full">
            <input
              type="text"
              placeholder="Search by Disease"
              className="w-full pl-12 pr-4 py-4 border border-yellow-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 bg-transparent">
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
              className="text-lg border border-yellow-300 rounded-md px-2 py-2 pr-28"
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
            <button className="text-lg border border-yellow-300 rounded-md px-2 py-2 pr-28">
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 px-16 mt-5">
        <div className="col-span-1">
          <div className="sticky top-0">
            <h3 className="text-lg text-green-400  font-semibold">
              Search Doctor By Disease
            </h3>
            <Disease />
          </div>
        </div>
        <div className="col-span-3 ">
          <h1 className=" text-2xl font-bold mb-5 text-green-400">
            AI Recomended Doctors
          </h1>
          <DoctorCards />
          <button className="mt-7 hover:scale-105 transition-shadow duration-500 ">
            <a
              href="/Patient/dashboard"
              className="text-green-400 border rounded-md border-yellow-200 hover:border-yellow-300  p-3"
            >
              View More
            </a>
          </button>
          <div className="mb-10">
            <h1 className=" text-2xl mt-10 font-bold mb-5 text-green-400">
              Search Based Doctors
            </h1>
            <DoctorCards />
            <button className="mt-7 hover:scale-105 transition-shadow duration-500 ">
              <a
                href="/Patient/dashboard"
                className="text-green-400 border rounded-md border-yellow-200 hover:border-yellow-300  p-3"
              >
                View More
              </a>
            </button>
          </div>
          <div>
            <h1 className="text-2xl text-green-300 mb-10">
              Ayurvedic Consultation at Your Fingertips: The Power of Online
              Doctor Consultations in Ayurveda
            </h1>
            <p className="mb-5">
              In today's fast-paced world, where time is of the essence and
              convenience is king, accessing quality healthcare has become more
              important than ever. With the rise of digital platforms, the
              traditional barriers to online medical doctor consultations are
              crumbling, opening up new avenues for patients to seek expert
              advice from the comfort of their homes. One such revolutionary
              platform leading the charge in holistic healthcare is AyurConnect,
              a trusted name in online medical doctor consultations/online
              doctor advice for Ayurveda.
            </p>
            <p className="mb-5">
              Gone are the days of long waiting times at crowded clinics or
              struggling to find the right specialist. With AyurConnect, online
              medical doctor consultation i.e the power to connect with over
              1000+ verified Ayurvedic and Homeopathic doctors i.e online doctor
              advice is literally at your fingertips. Each doctor undergoes a
              rigorous verification process to ensure that only authorized
              practitioners provide their expertise on the platform,
              guaranteeing peace of mind and quality care for every patient.
              Online doctor advice is on your fingertip.
            </p>
            <p className="mb-5">
              The beauty of online medical doctor consultations lies in their
              accessibility and flexibility. No longer constrained by
              geographical boundaries or office hours, patients can seek advice
              from qualified professionals at any time, from anywhere. Whether
              you're battling a persistent ailment, seeking preventive care, or
              simply looking to enhance your overall well-being, AyurConnect
              offers online doctor advice and a comprehensive range of services
              tailored to your specific needs. online doctor advice has been
              made credible and accessible by AyurConnect.com.
            </p>
            <p className="mb-5">
              One of the key benefits of online medical doctor consultations is
              the personalized attention and care that patients receive. Through
              a combination of advanced technology and dedicated support,
              AyurConnect ensures that every interaction with a doctor is
              tailored to address individual concerns and preferences i.e online
              medical doctor consultation. From detailed health assessments to
              personalized treatment plans, patients can expect nothing but the
              highest standards of care from the comfort of their homes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHome;
