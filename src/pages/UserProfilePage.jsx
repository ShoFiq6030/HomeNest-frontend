import React from "react";
import { useParams } from "react-router";
import { useApi } from "../hooks/useApi";
import Loading from "../components/common/Loading";

export default function UserProfilePage() {
  const { id } = useParams();
  const {
    data: user,
    loading,
    error,
  } = useApi({
    url: `/api/users/user-details/${id}`,
  });

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-6">Error... please try again</p>
    );
  if (!user) return null;

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className="px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 border border-pink-100">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-pink-500 shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full flex items-center justify-center bg-pink-600 text-white text-3xl font-bold shadow-md">
              {initials}
            </div>
          )}

          <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-b"></div>

        {/* Profile Details */}
        <div className="space-y-3 text-gray-700">
          <h3 className="text-lg font-semibold text-gray-800">
            Profile Details
          </h3>

          <p className="flex justify-between">
            <span className="font-medium">User ID:</span>
            <span className="text-gray-600">{user._id}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Email verify:</span>
            <span className="text-gray-600">{user.emailVerify || "false"}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-medium">Account Created:</span>
            <span className="text-gray-600">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>

        {/* Additional Action Section */}
        {/* <div className="mt-8 text-center">
          <button className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition">
            Edit Profile
          </button>
        </div> */}
      </div>
    </section>
  );
}
