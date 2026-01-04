import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaCheckCircle, FaTimesCircle, FaSearch, FaFilter } from "react-icons/fa";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmModal from "../common/ConfirmModal";

export default function AdminPropertyTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const { data: properties, loading, error, refetch } = useApi({
    url: "/api/properties",
    method: "GET",
  });

  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    if (properties) {
      setPropertiesData(properties);
    }
  }, [properties]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleApproveProperty = async (propertyId, isApproved) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${propertyId}/approve`,
        { isApproved: !isApproved },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Property ${isApproved ? "unapproved" : "approved"} successfully!`);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update property status.");
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Property deleted successfully!");
      setOpenConfirmModal(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete property.");
    }
  };

  const handleViewProperty = (propertyId) => {
    window.location.href = `/all-properties/${propertyId}`;
  };

  const filteredProperties = propertiesData?.filter((property) => {
    const matchesSearch =
      property.propertyName?.toLowerCase().includes(searchTerm) ||
      property.location?.toLowerCase().includes(searchTerm) ||
      property.category?.toLowerCase().includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "approved" && property.isApproved) ||
      (statusFilter === "pending" && !property.isApproved);
    
    const matchesCategory = categoryFilter === "all" || property.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((filteredProperties?.length || 0) / itemsPerPage);

  const categories = [...new Set(propertiesData?.map(p => p.category))];

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">Error loading properties: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      {openConfirmModal && (
        <ConfirmModal
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={() => handleDeleteProperty(selectedProperty)}
        />
      )}
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Management</h2>
        
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name, location, or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusFilter("approved")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "approved"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Approved ({propertiesData?.filter(p => p.isApproved)?.length || 0})
            </button>
            <button
              onClick={() => handleStatusFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending ({propertiesData?.filter(p => !p.isApproved)?.length || 0})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryFilter("all")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Property
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Location
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Owner
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProperties?.length > 0 ? (
              currentProperties.map((property) => (
                <tr
                  key={property._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.image}
                        alt={property.propertyName}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{property.propertyName}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(property.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">{property.location}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                      {property.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-800">
                      ${property.price?.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center gap-2 ${
                      property.isApproved ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {property.isApproved ? (
                        <>
                          <FaCheckCircle className="w-4 h-4" />
                          <span className="font-medium">Approved</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="w-4 h-4" />
                          <span className="font-medium">Pending</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">{property.userId?.name || "Unknown"}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewProperty(property._id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Property"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApproveProperty(property._id, property.isApproved)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          property.isApproved
                            ? "bg-yellow-600 text-white hover:bg-yellow-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {property.isApproved ? "Unapprove" : "Approve"}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProperty(property._id);
                          setOpenConfirmModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete Property"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                    ? "No properties found matching your criteria."
                    : "No properties available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {propertiesData?.length > itemsPerPage && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, propertiesData?.length)} of{" "}
            {propertiesData?.length} properties
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
