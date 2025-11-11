import React from "react";
import PropertyCard from "../common/PropertyCard";
import { useApi } from "./../../hooks/useApi";

export default function ForSellSection() {
  const { data, loading, error } = useApi({
    url: "/api/properties",
    method: "GET",
  });
  const forSellData = data?.filter((property) => {
    return property.category === "Sale";
  });
  console.log(forSellData);

  return (
    <div className=" my-10">
      <div className="text-center flex flex-col gap-4 m-10">
        <h2 className="text-4xl font-bold">Properties for Sale</h2>
        <p>We provide full service at every step.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {forSellData?.map((property) => (
          <PropertyCard property={property} key={property._id} />
        ))}
      </div>
    </div>
  );
}
