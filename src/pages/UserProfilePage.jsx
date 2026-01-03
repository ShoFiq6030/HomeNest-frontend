import React from "react";
import { Link, useParams } from "react-router";
import { useApi } from "../hooks/useApi";
import Loading from "../components/common/Loading";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "./../hooks/useAuth";

export default function UserProfilePage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const {
    data: userData,
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
  if (!userData) return null;

  const initials = userData?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className="px-6 py-10">
      <div
        className={`max-w-2xl mx-auto  ${
          theme === "dark" ? " bg-gray-400" : "bg-white"
        } shadow-md rounded-xl p-8 border border-pink-100`}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          {userData.photoURL ? (
            <img
              src={userData.photoURL}
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-pink-500 shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full flex items-center justify-center bg-pink-600 text-white text-3xl font-bold shadow-md">
              {initials}
            </div>
          )}

          <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
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
            <span className="text-gray-600">{userData._id}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600">{userData.email}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Email verify:</span>
            <span className="text-gray-600">
              {userData.emailVerify || "false"}
            </span>
          </p>

          <p className="flex justify-between">
            <span className="font-medium">Account Created:</span>
            <span className="text-gray-600">
              {new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>

        {/* Additional Action Section */}
        <div className="mt-8 text-center flex gap-4 ">
          <button className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition">
            Edit Profile
          </button>
          {/* <button className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition">
            change password
          </button> */}
          {user && (
            <Link
              to={
                user.role === "admin"
                  ? `/dashboard/admin/${id}`
                  : `/dashboard/user/${id}`
              }
              className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
