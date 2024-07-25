import React, { useState, useEffect } from "react";

interface LodgeSavedProps {
  show: boolean;
  onClose: () => void;
}

const LodgeSaved: React.FC<LodgeSavedProps> = ({
  show,
  onClose,
}) => {
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
      className="fixed inset-0 bg-black bg-opacity-50 flex pt-[100px] items-start z-50 justify-center"
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
            <p className="text-[24px] text-primary mb-8">Lodge Saved! </p>
          </div>
        </div>
        <div className="text-gray-700">
          <p className="w-[350px] text-center mb-[50px]">
            Thsi lodge has been saved for visit. Go to the “Tour Cart” tab in
            the Wishlist menu to view it.
          </p>
          <button className=" mb-4 py-4 bg-primary  font-semibold w-full rounded-[12px] flex justify-center items-center gap-2 text-white ">
            View now{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LodgeSaved;
