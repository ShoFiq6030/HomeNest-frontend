import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useApi } from "../../hooks/useApi";
import Loading from "../common/Loading";
import PropertyOverlayCard from "./PropertyOverlayCard";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const { data, loading, error } = useApi({
    url: "/api/properties",
    method: "GET",
  });

  useEffect(() => {
    if (!data || data.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.min(data.length, 3));
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <p>Failed to load: {error.message}</p>;
  if (!data || data.length === 0) return null;

  return (
    <div className="relative w-screen h-[300px] md:h-[600px] lg:h-[80vh] overflow-hidden">
      {data.slice(0, 3).map((property, index) => {
        const bgUrl =
          property.image ||
          "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e";

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity   duration-2000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            } bg-cover bg-center`}
            style={{ backgroundImage: `url(${bgUrl})` }}
          >
            <div className="w-full h-full bg-black/10 flex items-center justify-end">
              <PropertyOverlayCard property={property} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
