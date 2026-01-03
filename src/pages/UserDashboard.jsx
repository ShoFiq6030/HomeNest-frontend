import React, { useState, useMemo } from "react";
import { useParams, Navigate } from "react-router";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/common/Loading";
import AddPropertyModal from "../components/common/AddPropertyModal";
import PropertyCard from "../components/common/PropertyCard";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const { useId } = useParams();
  const { user, authLoading } = useAuth();
  const { theme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(Date.now());

  // Ensure only the owner can access their dashboard
  if (authLoading) return <Loading />;
  if (!user) return <Navigate to="/" />;
  if (user._id !== useId) {
    toast.error("Unauthorized access to this dashboard.");
    return <Navigate to="/" />;
  }

  const {
    data: properties,
    loading,
    error,
  } = useApi({
    url: `/api/properties/user/${useId}`,
    deps: [useId, refreshKey],
  });

  const totalProperties = properties ? properties.length : 0;
  const totalValue = useMemo(() => {
    if (!properties) return 0;
    return properties.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  }, [properties]);

  const filtered = useMemo(() => {
    if (!properties) return [];
    const term = search.trim().toLowerCase();
    if (!term) return properties;
    return properties.filter(
      (p) =>
        p.propertyName?.toLowerCase().includes(term) ||
        p.location?.toLowerCase().includes(term)
    );
  }, [properties, search]);

  return (
    <section className="px-6 py-10">
      <div
        className={`max-w-7xl mx-auto ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
        } shadow-md rounded-xl p-6`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user.name.split(" ")[0]}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your listed properties from your dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search properties..."
                className={`pl-10 pr-4 py-2 rounded-lg border w-64 focus:outline-none ${
                  theme === "dark"
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-200"
                }`}
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition"
            >
              <FaPlus /> Add Property
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div
            className={`p-4 rounded-lg shadow ${
              theme === "dark" ? "bg-gray-600" : "bg-white"
            }`}
          >
            <p className="text-sm text-gray-500">Total Properties</p>
            <p className="text-2xl font-semibold">{totalProperties}</p>
          </div>
          <div
            className={`p-4 rounded-lg shadow ${
              theme === "dark" ? "bg-gray-600" : "bg-white"
            }`}
          >
            <p className="text-sm text-gray-500">Total Listing Value</p>
            <p className="text-2xl font-semibold">
              ${totalValue.toLocaleString()}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg shadow ${
              theme === "dark" ? "bg-gray-600" : "bg-white"
            }`}
          >
            <p className="text-sm text-gray-500">Profile</p>
            <p className="text-2xl font-semibold">{user.email}</p>
          </div>
        </div>

        {/* Properties list */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Properties</h2>

          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-500">Failed to load properties.</p>
          ) : properties?.length === 0 ? (
            <p className="text-gray-700">
              You have not added any properties yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddPropertyModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setRefreshKey(Date.now())}
        />
      )}
    </section>
  );
}
