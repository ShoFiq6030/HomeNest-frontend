import React from "react";
import PropertyCard from "../common/PropertyCard";
import { useApi } from "./../../hooks/useApi";
import Loading from "../common/Loading";

export default function ForSellSection() {
  const { data, loading, error } = useApi({
    url: "/api/properties",
    method: "GET",
  });
  const forSellData = data?.filter((property) => {
    return property.category === "Sale";
  });
  // console.log(forSellData);

  return (
    <div className=" my-10 container mx-auto">
      <div className="text-center flex flex-col gap-4 m-10">
        <h2 className="text-4xl font-bold">
          Properties for <span className="text-pink-500">Sale</span>{" "}
        </h2>
        <p>We provide full service at every step.</p>
      </div>
      {loading && <Loading />}
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 gap-4">
        {forSellData?.map((property) => (
          <PropertyCard property={property} key={property._id} />
        ))}
      </div>
    </div>
  );
}
