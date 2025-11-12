import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

export default function ReviewForm({ propertyId, user = {} }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      setMessage("Please give a rating and write a review.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/reviews/add-review", {
        propertyId,
        userId: user?._id,
        userName: user?.name,
        userEmail: user?.email,
        rating,
        reviewText,
      });

      setMessage("✅ Review submitted successfully!");
      setReviewText("");
      setRating(0);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white  shadow-md p-6 mt-10 border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-5">
        Write a Review
      </h3>

      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={index}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            >
              <FaStar
                size={28}
                className={`transition ${
                  starValue <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Review Textarea */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows="4"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-1/4 py-3 font-semibold text-white  transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
