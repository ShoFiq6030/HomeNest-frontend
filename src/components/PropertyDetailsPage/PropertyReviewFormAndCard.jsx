import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviweForm";
import PropertyReviews from "./PropertyReviews";
import { useApi } from "../../hooks/useApi";

export default function PropertyReviewFormAndCard({ propertyId }) {
  const {
    data = [],
    loading,
    error,
  } = useApi({
    url: `/api/reviews/all-reviews/${propertyId}`,
    method: "GET",
  });
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    if (data) {
      setReviewData(data);
    }
  }, [data]);

  //   console.log(reviewData);

  return (
    <>
      <ReviewForm
        propertyId={propertyId}
        setReviewData={setReviewData}
        reviewData={reviewData}
      />
      <PropertyReviews
        propertyId={propertyId}
        reviewData={reviewData}
        loading={loading}
        error={error}
      />
    </>
  );
}
