import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "./../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLoginModal } from "../../hooks/useLoginModal";

export default function ReviewForm({ propertyId, setReviewData, reviewData }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { openLoginModal, setOpenLoginModal } = useLoginModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setOpenLoginModal(true);
      return toast.error("Please Login for give review");
    }

    if (!rating || !reviewText) {
      setMessage("Please give a rating and write a review.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const newReviewData = {
        propertyId,
        rating,
        reviewText,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/reviews/add-review`,
        newReviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);
      setReviewData([res.data.review, ...reviewData]);
      toast.success("✅ Review submitted successfully!");

      setMessage("✅ Review submitted successfully!");
      setReviewText("");
      setRating(0);
      // window.location.reload();
    } catch (err) {
      console.error(err);

      // setMessage(err)
      toast.error("❌ something was wrong");
      setMessage(err.response.data.message);
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
          className={`w-1/4 py-3 font-semibold rounded-lg text-white  transition ${
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
