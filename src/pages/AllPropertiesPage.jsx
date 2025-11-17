import React, { useState } from "react";
import { useApi } from "../hooks/useApi";
import PropertyCard from "../components/common/PropertyCard";
import Loading from "../components/common/Loading";

import PropertyFilters from "../components/AllPropertiesPage/PropertyFilters";

export default function AllPropertiesPage() {
  const [active, setActive] = useState("All");

  // Filter states
  const [search, setSearch] = useState("");
  const [room, setRoom] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bath, setBath] = useState("");
  const [garage, setGarage] = useState("");
  const [sortBy, setSortBy] = useState("");
// const [filtering, setFiltering] = useState(false);

const {
    data = [],
    loading,
    error,
  } = useApi({
    url: "/api/properties",
    method: "GET",
  });

  const categories = ["All", "Sale", "Commercial", "Land", "Rent"];

  const filteredProperties = data
    ?.filter((property) => {
    
      if (active !== "All" && property.category !== active) return false;
      if (
        search &&
        !property.propertyName?.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (room && property.Rooms < Number(room)) return false;
      if (bedroom && property.Bedrooms < Number(bedroom)) return false;
      if (bath && property.Bath < Number(bath)) return false;
      if (garage && property.Garages < Number(garage)) return false;
      return true;
      
    })
    ?.sort((a, b) => {
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      return 0;
    });

    const handleFilterChange = (callback) => {
  setFiltering(true); 
  setTimeout(() => {
    callback();      
    setFiltering(false);
  }, 1000); 
};

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

      {/* Filter Component */}
      <PropertyFilters
        search={search}
        setSearch={setSearch}
        room={room}
        setRoom={setRoom}
        bedroom={bedroom}
        setBedroom={setBedroom}
        bath={bath}
        setBath={setBath}
        garage={garage}
        setGarage={setGarage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleFilterChange={handleFilterChange}
      />

      {/* Property List */}
      {loading  ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <Loading />
        </div>
      ) : filteredProperties?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No properties found.</div>
      )}
    </section>
  );
}
