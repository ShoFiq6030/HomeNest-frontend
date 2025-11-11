import React, { useState } from "react";
import { useApi } from "../hooks/useApi";
import PropertyCard from "../components/common/PropertyCard";
import Loading from "../components/common/Loading";

export default function AllPropertiesPage() {
  const [active, setActive] = useState("All");
  const {
    data = [],
    loading,
    error,
  } = useApi({
    url: "/api/properties",
    method: "GET",
  });

  const categories = ["All", "Sale", "Commercial", "Land", "Rent"];

  const filteredProperties =
    active === "All"
      ? data
      : data.filter((property) => property.category === active);

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load properties. Please try again later.
      </div>
    );

  return (
    <section className="px-6 py-10">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Find Your Dream Property
        </h1>
        <p className="text-gray-500 mt-2">
          Browse through our curated collection of properties.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-4 border-b border-pink-600 pb-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              active === category
                ? "bg-pink-600 text-white border border-pink-600"
                : "text-gray-700 hover:text-pink-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <Loading />
        </div>
      ) : filteredProperties?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property._id || property.id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No properties found in this category.
        </div>
      )}
    </section>
  );
}
