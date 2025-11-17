import React, { useState } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaLink,
  FaVideo,
  FaCamera,
  FaEdit,
  FaTrash,
  FaCar,
  FaHeart,
} from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import UpdatePropertyModal from "../updatePropertyModal/UpdatePropertyModal";
import { useLoginModal } from "../../hooks/useLoginModal";
import ConfirmModal from "./ConfirmModal";

export default function PropertyCard({ property = {}, featured = false }) {
  const {
    _id,

    category = "For Sale",
    propertyName = "Real House Luxury Villa",
    location = "Est St, 77 - Central Park South, NYC",
    Bedrooms = 6,
    Garages,
    Bath = 3,
    area = "720 sq ft",
    price = "$350,000",
    image = "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  } = property;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { openLoginModal, setOpenLoginModal } = useLoginModal();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  if (isDeleted) return null;

  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Property deleted successfully!");
      // window.location.reload();
      setIsDeleted(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete property.");
    }
  };

  const formattedPrice = price?.toLocaleString();

  return (
    <div className="bg-white  max-w-[400px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {isModalOpen && (
        <UpdatePropertyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          property={property}
        />
      )}
      {openConfirmModal && (
        <ConfirmModal
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={handleDelete}
        />
      )}
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={propertyName}
          className="w-full h-56 object-cover"
        />

        {/* Labels */}
        <div className="absolute top-3 left-3 flex gap-2">
          {featured && (
            <span className="bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-xs px-2 py-1 rounded-sm font-semibold">
              Featured
            </span>
          )}
          <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-sm font-semibold">
            {category}
          </span>
          {user?._id === property.userId && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-sm font-semibold">
              own
            </span>
          )}
        </div>

        {/* Overlay Icons */}
        {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 bg-white/90 px-4 py-2 rounded-full shadow-sm"> */}
        {/* <FaLink className="cursor-pointer hover:text-red-500 transition" /> */}
        {/* <FaVideo className="cursor-pointer hover:text-red-500 transition" /> */}
        {/* <FaCamera className="cursor-pointer hover:text-red-500 transition" />
        </div> */}
      </div>

      {/* Property Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          {" "}
          {user ? (
            <Link
              to={`/all-properties/${_id}`}
              className="font-semibold text-lg hover:underline cursor-pointer"
            >
              {propertyName}
            </Link>
          ) : (
            <h2
              onClick={() => {
                toast.error("Please Login!");
                setOpenLoginModal(true);
              }}
              className="font-semibold text-lg hover:underline cursor-pointer"
            >
              {propertyName}
            </h2>
          )}
          {user?._id === property.userId && (
            <div className="flex gap-4 ">
              <button
                className=" cursor-pointer"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600 cursor-pointer"
                onClick={() => setOpenConfirmModal(true)}
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        <p className="flex items-center text-sm text-gray-500 mt-1">
          <FaMapMarkerAlt className="mr-2 text-pink-600" /> {location}
        </p>

        {/* Info Icons */}
        <div className="flex justify-between items-center text-sm text-gray-600 border-b mt-3 pb-3">
          <span className="flex items-center gap-2">
            <FaBed className="text-pink-600" /> {Bedrooms} Beds
          </span>
          <span className="flex items-center gap-2">
            <FaBath className="text-pink-600" /> {Bath} Baths
          </span>
          <span className="flex items-center gap-2">
            <FaRulerCombined className="text-pink-600" /> {area} sq. ft.
          </span>
          <div className="flex items-center">
            <FaCar className="text-pink-500 mr-2 w-5 h-5" />
            <span>{Garages} Garages</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-gray-800">
            ${formattedPrice}
          </p>
          <div className="flex items-center gap-4 text-gray-500 ">
            {isLiked ? (
              <button
                onClick={() => setIsLiked(false)}
                className=" text-red-600 cursor-pointer"
              >
                <FaHeart size={23} />
              </button>
            ) : (
              <button
                onClick={() => setIsLiked(true)}
                className="hover:text-red-500 cursor-pointer"
              >
                <FiHeart size={23} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
