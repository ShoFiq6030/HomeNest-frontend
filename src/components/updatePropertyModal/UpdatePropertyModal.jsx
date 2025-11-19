import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { photoUploadToCloudinary } from "../../utils/uploadImgToCloudinary";
import { useTheme } from "../../hooks/useTheme";

export default function UpdatePropertyModal({ isOpen, onClose, property }) {
  const [formData, setFormData] = useState({
    propertyName: "",
    description: "",
    category: "",
    price: "",
    Rooms: "",
    Bedrooms: "",
    Bath: "",
    Garages: "",
    location: "",
    image: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Fill form when modal opens or property changes
  useEffect(() => {
    if (property && isOpen) {
      setFormData({
        propertyName: property.propertyName || "",
        description: property.description || "",
        category: property.category || "",
        price: property.price,
        Rooms: property.Rooms,
        Bedrooms: property.Bedrooms,
        Bath: property.Bath,
        Garages: property.Garages,
        location: property.location,
        image: property.image,
        area: property.area,
      });
    }
  }, [property, isOpen]);

  console.log(property, property.area);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!property?._id) return;
    const photo = e.target.photo.files[0];

    setLoading(true);
    try {
      let photoURL = property.image;
      if (photo) {
        photoURL = await photoUploadToCloudinary(photo);
      }
      if (photoURL === null) {
        return toast.error(
          "Invalid Img Type...allowed only jpg,jpeg,png,webp,gif."
        );
      }
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${property._id}`,
        {
          ...formData,
          image: photoURL,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      const data = res.data;

      if (!res.status === 200) throw new Error(data.message || "Update failed");

      toast.success("Property updated successfully!");

      onClose();
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-200" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-250 p-4">
        <div
          className={` ${
            theme === "dark" ? "bg-gray-500 " : "bg-white"
          } rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto`}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Update Property</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              disabled={loading}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Property Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Property Name</span>
                </label>
                <input
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                  <option value="Commercial">For Commercial</option>
                  <option value="Land">For Land</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Price ($)</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Rooms */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Rooms</span>
                </label>
                <input
                  type="number"
                  name="Rooms"
                  value={formData.Rooms}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Bedrooms</span>
                </label>
                <input
                  type="number"
                  name="Bedrooms"
                  value={formData.Bedrooms}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Bathrooms</span>
                </label>
                <input
                  type="number"
                  name="Bath"
                  value={formData.Bath}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                  // step="0.5"
                />
              </div>

              {/* Garages */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Garages</span>
                </label>
                <input
                  type="number"
                  name="Garages"
                  value={formData.Garages}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                />
              </div>
              {/* Area */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Area (square feet)
                  </span>
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                />
              </div>

              {/* Location */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Image URL */}

            <div>
              <img
                src={formData?.image}
                alt={formData.propertyName}
                className="w-20 h-20 object-cover"
              />
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text font-medium">Image</span>
              </label>
              <input
                type="file"
                name="photo"
                className="file-input"
                accept="image/*"
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full h-28"
                placeholder="Enter property description..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-pink-600 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Updating...
                  </>
                ) : (
                  "Update Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
