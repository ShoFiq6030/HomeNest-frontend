import React from "react";
import { FaStar } from "react-icons/fa";

const PopularPlaceCard = ({ city, propertiesCount, rating = 4, imageUrl }) => {
  return (
    <div
      className="relative h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden
                 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40  flex flex-col justify-end p-5">
        <h3 className="text-white text-2xl font-bold mb-1 ">{city}</h3>
        <p className="text-white text-sm opacity-90 mb-3">
          {propertiesCount} Properties
        </p>
        <div className="flex">
          {/* Render stars based on the rating prop */}
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "text-red-500" : "text-gray-400"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPlaceCard;
