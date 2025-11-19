import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { photoUploadToCloudinary } from "../../utils/uploadImgToCloudinary";
import { useTheme } from "../../hooks/useTheme";

export default function AddPropertyModal({ onClose }) {
  const [formData, setFormData] = useState({
    propertyName: "",
    description: "",
    category: "Sale",
    price: "",
    location: "",
    image: "",
    Rooms: "",
    Bedrooms: "",
    Bath: "",
    Garages: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  //   if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Validate image
      if (!formData.image || !formData.image.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        setLoading(false);
        return;
      }

      //  Upload to Cloudinary
      const imageUrl = await photoUploadToCloudinary(formData.image);

      if (!imageUrl) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }

      const newFormData = {
        ...formData,
        image: imageUrl, 
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
      };

      
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties`,
        newFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Property added successfully!");

      //  Reset form
      setFormData({
        propertyName: "",
        description: "",
        category: "Sale",
        price: "",
        location: "",
        image: "",
        Rooms: "",
        Bedrooms: "",
        Bath: "",
        Garages: "",
        area: "",
      });

      navigate("/my-properties?refresh=" + Date.now());
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-6">
      <div
        className={`w-full max-w-2xl sm:max-w-3xl md:max-w-4xl ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
        } shadow-xl p-4 sm:p-6 md:p-8 relative rounded-lg overflow-y-auto max-h-[90vh]`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Add New Property
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* All inputs remain mostly the same */}
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            placeholder="Property Name"
            className="border p-2 rounded w-full"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`select select-bordered w-full ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black"
            }`}
          >
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
            <option value="Commercial">For Commercial</option>
            <option value="Land">For Land</option>
          </select>

          {/* Other inputs like price, location, rooms, etc. */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded w-full"
            required
            min={0}
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded w-full"
            required
          />

          {/* Image Upload */}
          <div className="flex flex-col col-span-1 sm:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              className={`file-input file-input-bordered w-full ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              required
            />
          </div>

          {/* Textarea */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Property Description"
            className="border p-2 rounded col-span-1 sm:col-span-2 w-full"
            rows="3"
            required
          />

          {/* Other numeric fields (Rooms, Bedrooms, Bath, Garages, Area) */}
          <input
            type="number"
            name="Rooms"
            value={formData.Rooms}
            onChange={handleChange}
            placeholder="Total Rooms"
            className="border p-2 rounded w-full"
            required
            min={0}
          />
          <input
            type="number"
            name="Bedrooms"
            value={formData.Bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="border p-2 rounded w-full"
            required
            min={0}
          />
          <input
            type="number"
            name="Bath"
            value={formData.Bath}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="border p-2 rounded w-full"
            required
            min={0}
          />
          <input
            type="number"
            name="Garages"
            value={formData.Garages}
            onChange={handleChange}
            placeholder="Garages"
            className="border p-2 rounded w-full"
            required
            min={0}
          />
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area (sq ft)"
            className="border p-2 rounded w-full"
            required
            min={0}
          />

          {/* User Info */}
          <input
            type="text"
            name="userEmail"
            value={user.email}
            className="border p-2 rounded w-full"
            readOnly
          />
          <input
            type="text"
            name="userName"
            value={user.name}
            className="border p-2 rounded w-full"
            readOnly
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`col-span-1 sm:col-span-2 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Add Property"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
