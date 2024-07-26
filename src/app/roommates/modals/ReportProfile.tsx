import React, { useState, useEffect } from "react";
import AOS from "aos";

interface ReportProfileProps {
  show: boolean;
  onClose: () => void;
}

const ReportProfile: React.FC<ReportProfileProps> = ({
  show,
  onClose,
}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

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
        data-aos="zoom-in-up"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-0"></div>
        <div className="text-gray-700">
          <textarea
            name="review"
            placeholder="Enter a reason for reporting this profile..."
            className="border w-[350px] sm:w-[700px] mb-[50px] resize-none mt-4 h-[200px] p-2 rounded-lg outline-none"
          ></textarea>
          <p className="text-end">500/500 remaining</p>
          <button className=" mb-4 py-4 bg-red-600 font-semibold  w-full rounded-[12px] text-white flex justify-center ">
            Report profile{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportProfile;
