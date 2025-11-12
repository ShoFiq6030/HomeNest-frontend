import React from "react";
import { FaStar, FaRegStar, FaUser } from "react-icons/fa";
import { useApi } from "../../hooks/useApi";

export default function PropertyReviews({ id }) {
  const {
    data = [],
    loading,
    error,
  } = useApi({
    url: `/api/reviews/all-reviews/${id}`,
    method: "GET",
  });

  if (loading)
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        Loading reviews...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-6">
        Failed to load reviews. Please try again later.
      </div>
    );

  if (!data?.length)
    return (
      <div className="text-center text-gray-500 mt-6">
        No reviews yet. Be the first to leave a review!
      </div>
    );

  return (
    <section className="mt-12 bg-gray-50  p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Customer Reviews ({data.length})
      </h2>

      <div className="space-y-6">
        {data.map((review) => (
          <div
            key={review._id}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            {/* Header: User Info + Rating */}
            <div className="flex flex-col items-start mb-3 gap-2">
              <div className="flex gap-2">
                <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full">
                  <FaUser className="text-pink-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {review.userName}
                  </h3>
                  <p className="text-sm text-gray-500">{review.userEmail}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300" />
                  )
                )}
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 mb-2">{review.reviewText}</p>

            {/* Date */}
            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
