// StarRating.js
import React from "react";

const StarRating = ({ rating }) => {
  const totalStars = 5; // Total number of stars
  const stars = Array(totalStars).fill(0); // Array to represent stars

  return (
    <div className="flex">
      {stars.map((_, index) => (
        <span key={index} className="text-yellow-500">
          {index < rating ? "★" : "☆"} {/* Filled star or empty star */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
