import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function ReviewModals() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const maxChars = 500;

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const remainingChars = maxChars - review.length;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        {/* First div: Profile, Name, Date, Cancel Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src="/path/to/profile.jpg"
              alt="User Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-medium">User Name</h2>
              <p className="text-sm text-gray-500">05/05/23</p>
            </div>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => console.log("Close modal")}
          >
            X
          </button>
        </div>

        {/* Second div: Star Rating */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className="cursor-pointer"
              color={star <= rating ? "#ffc107" : "#e4e5e9"}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>

        {/* Third div: Review Input */}
        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            value={review}
            onChange={handleReviewChange}
            maxLength={maxChars}
            placeholder="Write your review here..."
          />
          <p className="text-right text-sm text-gray-500">
            {remainingChars}/{maxChars} remaining
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
            onClick={() => console.log("Submit review")}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModals;
