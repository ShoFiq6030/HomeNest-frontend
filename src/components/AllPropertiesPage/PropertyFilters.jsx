// components/common/PropertyFilter.jsx
import React from "react";

export default function PropertyFilters({
  search,
  setSearch,
  room,
  setRoom,
  bedroom,
  setBedroom,
  bath,
  setBath,
  garage,
  setGarage,
  sortBy,
  setSortBy,
  handleFilterChange,
}) {
  return (
    <div className="bg-white shadow p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by property name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-pink-500 p-2 rounded"
        />

        {/* Rooms */}
        <input
          type="number"
          placeholder="Rooms"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="border border-pink-500 p-2 rounded"
        />

        {/* Bedrooms */}
        <input
          type="number"
          placeholder="Bedrooms"
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
          className="border border-pink-500 p-2 rounded"
        />

        {/* Bathrooms */}
        <input
          type="number"
          placeholder="Bathrooms"
          value={bath}
          onChange={(e) => setBath(e.target.value)}
          className="border border-pink-500 p-2 rounded"
        />

        {/* Garages */}
        <input
          type="number"
          placeholder="Garages"
          value={garage}
          onChange={(e) => setGarage(e.target.value)}
          className="border border-pink-500 p-2 rounded"
        />

        {/* Sort by Price */}
        <div className="dropdown dropdown-hover">
          {/* Button */}
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 w-40 flex justify-between"
          >
            {sortBy === "low-high"
              ? "Price: Low → High"
              : sortBy === "high-low"
              ? "Price: High → Low"
              : "Sort by Price 🔽"}
          </div>

          {/* Dropdown Items */}
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => setSortBy("")} className="cursor-pointer">
                Default
              </a>
            </li>
            <li>
              <a
                onClick={() => setSortBy("low-high")}
                className="cursor-pointer"
              >
                Low → High
              </a>
            </li>
            <li>
              <a
                onClick={() => setSortBy("high-low")}
                className="cursor-pointer"
              >
                High → Low
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
