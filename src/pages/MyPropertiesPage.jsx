import React from "react";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/common/Loading";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import PropertyCard from "../components/common/PropertyCard";

export default function MyPropertiesPage() {
  const { user, authLoading } = useAuth();

  const {
    data: properties,
    loading,
    error,
  } = useApi({
    url: user?._id ? `/api/properties/user/${user._id}` : null,
    deps: [user?._id],
  });

  if (error)
    return <p className="text-red-500 text-center">Error loading properties</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Properties</h2>
      {authLoading || loading ? (
        <Loading />
      ) : properties?.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven’t posted any properties yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((property) => (
            <PropertyCard
              property={property}
              key={property._id}
              
            />
          ))}
        </div>
      )}
    </div>
  );
}
