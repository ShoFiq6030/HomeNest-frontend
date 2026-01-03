import React from "react";
import PropertyCard from "../common/PropertyCard";
import { useApi } from "../../hooks/useApi";
import Loading from "../common/Loading";

export default function FeatureProperties() {
  const { data, loading, error } = useApi({
    url: "/api/properties",
    method: "GET",
  });
  const recentlyCreated = data
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <section id="feature-properties" className=" my-10 container mx-auto">
      <div className="text-center flex flex-col gap-4 m-10">
        <h2 className="text-4xl font-bold">
          <span className="text-pink-500">Feature</span> Properties{" "}
        </h2>
        <p>Discover the most popular listings right now.</p>
      </div>
      {loading && <Loading />}
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentlyCreated?.map((property) => (
          <PropertyCard
            property={property}
            key={property._id}
            featured={true}
          />
        ))}
      </div>
    </section>
  );
}
