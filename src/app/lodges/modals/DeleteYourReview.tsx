import React, { useState, useEffect } from "react";

interface DeleteYourReviewProps {
  show: boolean;
  onClose: () => void;
}

const DeleteYourReview: React.FC<DeleteYourReviewProps> = ({ show, onClose }) => {
  

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
      className="fixed inset-0 bg-black bg-opacity-50 flex pt-[100px] justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-[12px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-4">
          <div className="flex w-full justify-center">
            <p className="text-[24px] text-[#F20C0C] mb-8">
              Delete your review
            </p>
          </div>
        </div>
        <div className="text-gray-700">
          <p className="w-[350px] text-center mb-[100px]">
            Clicking delete will delete your review. This action cannot be
            undone. If you do not intent to delete, please click the cancle
            button or close this modal.
          </p>
          <button
            className=" mb-4 py-4 border-4 font-semibold w-full flex justify-center "
            onClick={onClose}
          >
            Cancle
          </button>
          <button className=" mb-4 py-4 bg-red-600 font-semibold  w-full text-white flex justify-center ">
            Delete my review
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteYourReview;
