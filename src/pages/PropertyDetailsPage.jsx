import React from "react";
import { useParams } from "react-router";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCar,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { useApi } from "../hooks/useApi";
import Loading from "../components/common/Loading";
import PropertyReviews from "../components/PropertyDetailsPage/PropertyReviews";
import ReviewForm from "../components/PropertyDetailsPage/ReviweForm";

export default function PropertyDetailsPage() {
  const { id } = useParams();

  const {
    data = {},
    loading,
    error,
  } = useApi({
    url: `/api/properties/${id}`,
    method: "GET",
  });
  if (loading) return <Loading />;
  if (!data) return <div>No data found</div>;

  const {
    propertyName,
    description,
    category,
    price,
    location,
    image,
    Rooms,
    Bedrooms,
    Bath,
    Garages,
    userName,
  } = data;

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load property details. Please try again later.
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative mb-10">
        <img
          src={image}
          alt={propertyName}
          className="w-full h-[400px] object-cover  shadow-md"
        />
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3  shadow-md">
          <span className="bg-pink-200 text-pink-600 px-3 py-1 text-sm  font-semibold">
            {category}
          </span>
          <h1 className="text-2xl font-semibold text-gray-800">
            {propertyName}
          </h1>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <FaMapMarkerAlt className="text-pink-600" /> {location}
          </p>
        </div>
      </div>

      {/* Details and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Property Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Row */}
          <div className="flex flex-wrap gap-6 text-gray-700 border-b pb-4">
            <div className="flex items-center gap-2">
              <FaRulerCombined className="text-pink-600" />{" "}
              <span>{Rooms} Rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBed className="text-pink-600" /> <span>{Bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBath className="text-pink-600" /> <span>{Bath} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCar className="text-pink-600" /> <span>{Garages} Garages</span>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Property Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-pink-600">${price}</p>
          </div>
        </div>

        {/* Right: Agent Info */}
        <aside className="bg-white shadow-md  p-6 border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Agent Information
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full">
              <FaUser className="text-pink-600 text-xl" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{userName || "Agent"}</p>
              <p className="text-sm text-gray-500">Property Agent</p>
            </div>
          </div>

          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md transition-all duration-200">
            Contact Agent
          </button>
        </aside>
      </div>
      <ReviewForm propertyId={id} />
      <PropertyReviews id={id} />
    </section>
  );
}
