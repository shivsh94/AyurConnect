import React, { useState } from "react";

function Disease() {
  const diseases = [
    "Allergy",
    "Symptom",
    "Cancer",
    "Diabetes",
    "Heart Disease",
    "Hypertension",
    "Obesity",
    "Stroke",
    "Tuberculosis",
    "Malaria",
    "Asthma",
    "Chronic Kidney Disease",
     
    "Hepatitis",
    "HIV/AIDS",
    "Mental Health",
    "Nutrition",
    "Oral Health",
    "Reproductive Health",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter diseases based on search input
  const filteredDiseases = diseases.filter((disease) =>
    disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search diseases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-yellow-300 rounded-md w-3/4 mt-3 focus:outline-none focus:ring-1 focus:ring-yellow-400 "
        />
      </div>

      {/* Checkbox List */}
      <div>
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((item, index) => (
            <div className="flex items-center mb-5" key={index}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                className="form-checkbox h-5 w-5 mr-2 text-blue-600"
              />
              <label htmlFor={`checkbox-${index}`} className=" text-gray-500">
                {item}
              </label>
            </div>
          ))
        ) : (
          <p>No diseases found</p>
        )}
      </div>
    </div>
  );
}

export default Disease;
