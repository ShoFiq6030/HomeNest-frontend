import React from "react";
import PopularPlaceCard from "./PopularPlaceCard";
import { useTheme } from "../../hooks/useTheme";

export default function PopularPlaceSection() {
  const { theme } = useTheme();
  const places = [
    {
      id: 1,
      city: "New York",
      propertiesCount: 203,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=50&w=1080",
    },
    {
      id: 2,
      city: "Los Angeles",
      propertiesCount: 307,
      rating: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1574509322729-fdbcea67df6f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=50&w=1040",
    },
    {
      id: 3,
      city: "Miami",
      propertiesCount: 409,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=50&w=1040",
    },
    {
      id: 4,
      city: "Chicago",
      propertiesCount: 507,
      rating: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=50&w=1040",
    },
  ];

  // SVG pattern for the background
  const backgroundPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section
      id="most-popular-places"
      className={`py-16  ${
        theme === "dark" ? "bg-gray-600" : "bg-gray-50"
      }  relative overflow-hidden`}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: backgroundPattern,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold  mb-2">
            Most Popular <span className="text-pink-500">Places</span>
          </h2>
          <p className=" text-lg">Explore the world of real estate.</p>
        </div>

        {/* Grid of Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {places.map((place) => (
            <PopularPlaceCard
              key={place.id}
              city={place.city}
              propertiesCount={place.propertiesCount}
              rating={place.rating}
              imageUrl={place.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
