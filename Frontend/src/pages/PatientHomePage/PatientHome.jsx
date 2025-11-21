import React, { useEffect, useState } from "react";
import Disease from "./Disease";
import DoctorCards from "./DoctorCards";
import ImageCarousel from "./ImageCarousel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {loadDoctor, clearDoctor} from '../../features/doctor/doctorSlice';

function PatientHome() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [minExperience, setMinExperience] = useState(0);
  
  const dispatch = useDispatch();
  const allDoctors = useSelector((state) => state.doctor.currentDoctor);

  // Filter and search doctors
  const filteredDoctors = React.useMemo(() => {
    if (!allDoctors || !Array.isArray(allDoctors)) return [];
    
    let filtered = [...allDoctors];

    // Search by name or speciality
    if (searchTerm.trim()) {
      filtered = filtered.filter(doc => 
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.clinic?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by speciality
    if (selectedSpeciality) {
      filtered = filtered.filter(doc => 
        doc.speciality?.toLowerCase() === selectedSpeciality.toLowerCase()
      );
    }

    // Filter by experience
    if (minExperience > 0) {
      filtered = filtered.filter(doc => (doc.experience || 0) >= minExperience);
    }

    // Sort
    if (sortBy === 'experience-high') {
      filtered.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    } else if (sortBy === 'experience-low') {
      filtered.sort((a, b) => (a.experience || 0) - (b.experience || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return filtered;
  }, [allDoctors, searchTerm, selectedSpeciality, sortBy, minExperience]);


  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };

  // Toggle filter dropdown
  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle sort selection
  const handleSort = (value) => {
    setSortBy(value);
    setIsSortOpen(false);
  };

  // Handle filter clear
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpeciality("");
    setSortBy("");
    setMinExperience(0);
  };

  const [searchTermState, setSearchTermState] = useState("");

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get("/api/v1/user/getalldoctor");
        console.log(response.data);
        if (response.data.success) {
          // console.log(response.data);
          dispatch(loadDoctor(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchAllDoctors();
  }, [dispatch]);

  return (
    <div>
  
      <div className=" px-16 mt-5">
        <ImageCarousel />
      </div>
      <div className="w-full flex flex-col items-center justify-start bg-black">
         
        <div className="w-11/12 px-5 py-7 grid grid-cols-6 gap-5 place-items-center place-content-start">
           
          <div className="relative col-span-4 w-full">
            <input
              type="text"
              placeholder="Search by doctor name, speciality, or clinic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

           
          <div className="relative w-full">
            <button
              className="text-lg border border-yellow-300 rounded-md px-2 py-2 pr-28"
              onClick={toggleSortDropdown}
            >
              Sort By {sortBy && ': ' + sortBy}
            </button>
            {isSortOpen && (
              <div className="absolute w-full top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => handleSort('experience-high')}
                  >
                    Experience (High to Low)
                  </li>
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => handleSort('experience-low')}
                  >
                    Experience (Low to High)
                  </li>
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => handleSort('name')}
                  >
                    Name (A-Z)
                  </li>
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 border-t"
                    onClick={() => { setSortBy(''); setIsSortOpen(false); }}
                  >
                    Clear Sort
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="relative w-full">
            <button 
              className="text-lg border border-yellow-300 rounded-md px-2 py-2 pr-28"
              onClick={toggleFilterDropdown}
            >
              Filter {(selectedSpeciality || minExperience > 0) && '✓'}
            </button>
            {isFilterOpen && (
              <div className="absolute w-64 top-full right-0 mt-1 bg-white border rounded-md shadow-lg z-10 p-4">
                <h3 className="font-semibold mb-2 text-gray-800">Filter Options</h3>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Speciality
                  </label>
                  <select
                    value={selectedSpeciality}
                    onChange={(e) => setSelectedSpeciality(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-gray-800"
                  >
                    <option value="">All Specialities</option>
                    <option value="Kayachikitsa">Kayachikitsa</option>
                    <option value="Shalya Tantra">Shalya Tantra</option>
                    <option value="Shalakya Tantra">Shalakya Tantra</option>
                    <option value="Kaumarabhritya">Kaumarabhritya</option>
                    <option value="Agada Tantra">Agada Tantra</option>
                    <option value="Rasayana">Rasayana</option>
                    <option value="Vajikarana">Vajikarana</option>
                    <option value="Bhuta Vidya">Bhuta Vidya</option>
                    <option value="Swasthavritta">Swasthavritta</option>
                    <option value="Prasuti Tantra">Prasuti Tantra</option>
                    <option value="General Ayurvedic Medicine">General Ayurvedic Medicine</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Experience: {minExperience} years
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={minExperience}
                    onChange={(e) => setMinExperience(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button
                  onClick={() => { clearFilters(); setIsFilterOpen(false); }}
                  className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Clear Filters
                </button>
              </div>
            )}
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
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold text-green-400">
              {searchTerm || selectedSpeciality || minExperience > 0 || sortBy 
                ? 'Filtered Doctors' 
                : 'All Doctors'}
            </h1>
            {(searchTerm || selectedSpeciality || minExperience > 0 || sortBy) && (
              <button
                onClick={clearFilters}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear All Filters
              </button>
            )}
          </div>
          <div className="mb-4 text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </div>
          <DoctorCards doctors={filteredDoctors} />
          
          {!searchTerm && !selectedSpeciality && minExperience === 0 && (
            <>
              <div className="mb-10 mt-10">
                <h1 className="text-2xl mt-10 font-bold mb-5 text-green-400">
                  Recently Joined Doctors
                </h1>
                <DoctorCards doctors={allDoctors?.slice(0, 6) || []} />
              </div>
            </>
          )}
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
