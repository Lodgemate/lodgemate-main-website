import React, { useState, useEffect } from "react";

interface WriteReviewProps {
  show: boolean;
  onClose: () => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <div className="text-lg font-semibold mb-4">
          <div className="flex gap-2">
            <img src="" alt="" />
            <div>
              <h1 className="">McGreggor</h1>
              <p>05/05/23</p>
            </div>
          </div>
        </div>
        <div className="text-gray-700">
          This is the content of the WriteReview. You can put any information
          you want here.
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
