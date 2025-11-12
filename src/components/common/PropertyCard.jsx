import React from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaLink,
  FaVideo,
  FaCamera,
} from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router";

export default function PropertyCard({ property = {} }) {
  const {
    _id,
    featured = false,
    category = "For Sale",
    propertyName = "Real House Luxury Villa",
    location = "Est St, 77 - Central Park South, NYC",
    Bedrooms = 6,
    Bath = 3,
    area = "720 sq ft",
    price = "$350,000",
    image = "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  } = property;

  const formattedPrice = price?.toLocaleString();

  return (
    <div className="bg-white  w-[300px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />

        {/* Labels */}
        <div className="absolute top-3 left-3 flex gap-2">
          {featured && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
              Featured
            </span>
          )}
          <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
            {category}
          </span>
        </div>

        {/* Overlay Icons */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 bg-white/90 px-4 py-2 rounded-full shadow-sm">
          <FaLink className="cursor-pointer hover:text-red-500 transition" />
          {/* <FaVideo className="cursor-pointer hover:text-red-500 transition" /> */}
          <FaCamera className="cursor-pointer hover:text-red-500 transition" />
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <Link
          to={`/all-properties/${_id}`}
          className="font-semibold text-lg hover:underline cursor-pointer"
        >
          {propertyName}
        </Link>
        <p className="flex items-center text-sm text-gray-500 mt-1">
          <FaMapMarkerAlt className="mr-2 text-gray-400" /> {location}
        </p>

        {/* Info Icons */}
        <div className="flex justify-between items-center text-sm text-gray-600 border-b mt-3 pb-3">
          <span className="flex items-center gap-2">
            <FaBed /> {Bedrooms} Beds
          </span>
          <span className="flex items-center gap-2">
            <FaBath /> {Bath} Baths
          </span>
          <span className="flex items-center gap-2">
            <FaRulerCombined /> {area}
          </span>
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-gray-800">
            ${formattedPrice}
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-red-500">
              <FiHeart size={23} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
