import React from "react";
import {
  FaBed,
  FaBath,
  FaCar,
  FaRulerCombined,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router";

export default function PropertyOverlayCard({ property }) {
  // Destructure with defaults
  console.log(property);
  const {
    category = "FOR SALE",
    propertyName = "House Luxury Villa",
    location = "Est St, 77 - Central Park South, NYC",
    price = 1230000,
    Bedrooms = 6,
    Bath = 3,
    Garages = 2,
    area = 720,
    _id,
  } = property;

  // Format price with commas
  const formattedPrice = price?.toLocaleString();

  return (
    <div className="relative w-full max-w-sm mr-10  ">
      {/* FOR SALE Tag */}
      <div className="absolute -top-3 left-4 z-10 ">
        <span className="bg-pink-600 text-white uppercase text-xs font-semibold tracking-wider px-4 py-1 ">
          {category}
        </span>
      </div>

      {/* Main Card */}
      <div
        className="bg-white p-6 pt-10  shadow-lg flex flex-col gap-3
                   "
      >
        {/* Title */}
        <h2 className="text-xl font-extrabold mb-1">{propertyName}</h2>

        {/* Location */}
        <div className="flex items-center text-gray-700 mb-4">
          <FaMapMarkerAlt className="text-gray-600 mr-2 w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        <hr className="my-3 border-gray-200" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-gray-700 text-sm">
          <div className="flex items-center">
            <FaBed className="text-gray-500 mr-2 w-5 h-5" />
            <span>{Bedrooms} Bedrooms</span>
          </div>

          <div className="flex items-center">
            <FaBath className="text-gray-500 mr-2 w-5 h-5" />
            <span>{Bath} Bathrooms</span>
          </div>

          <div className="flex items-center">
            <FaCar className="text-gray-500 mr-2 w-5 h-5" />
            <span>{Garages} Garages</span>
          </div>

          <div className="flex items-center">
            <FaRulerCombined className="text-gray-500 mr-2 w-5 h-5" />
            <span>{area} sq ft</span>
          </div>
        </div>

        <hr className="my-3 border-gray-200" />

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${formattedPrice}
          </span>
        </div>

        {/* View Details Button */}
        {property?._id && (
          <Link to={`/property/${_id}`}>
            <button className="mt-5 w-full bg-pink-600 text-white py-2 rounded-md font-semibold ">
              View Details
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
