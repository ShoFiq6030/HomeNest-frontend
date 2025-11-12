import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

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
  });

  const [loading, setLoading] = useState(false);

  //   if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
    };
    // console.log(newFormData);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties`,
        newFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Property added successfully!");
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
      });
      navigate("/my-properties");
      onClose();
      // console.log(formData);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl  shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Property</h2>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            placeholder="Property Name"
            className="border p-2 rounded"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
            <option value="Commercial">For Commercial</option>
            <option value="Land">For Land</option>
          </select>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded col-span-2"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Property Description"
            className="border p-2 rounded col-span-2"
            rows="3"
            required
          />

          <input
            type="number"
            name="Rooms"
            value={formData.Rooms}
            onChange={handleChange}
            placeholder="Total Rooms"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="Bedrooms"
            value={formData.Bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="Bath"
            value={formData.Bath}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="Garages"
            value={formData.Garages}
            onChange={handleChange}
            placeholder="Garages"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}
