import React, { useState, useEffect } from "react";
import AOS from "aos";

interface CallAgentProps {
  show: boolean;
  onClose: () => void;
}

const CallAgent: React.FC<CallAgentProps> = ({
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
      className="fixed inset-0 bg-black bg-opacity-50 flex pt-[100px] items-start justify-center"
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
        <div className="mb-4">
          <div className="flex w-full justify-center">
            <p className="text-[24px] text-black mb-8">+1 700 1020 973</p>
          </div>
        </div>
        <div className="text-gray-700">
          <p className="w-[350px] text-center mb-[100px]">
            This is owner’s business phone number. Click the buttons below to
            either call or copy the phone number.
          </p>
          <button
            className=" mb-4 py-4 border rounded-[12px] border-primary text-primary font-semibold flex w-full justify-center items-center gap-2"
            onClick={onClose}
          >
            <img src="/icons/phone_white.svg" alt="" />
            Call number
          </button>
          <button className=" mb-4 py-4 bg-primary rounded-[12px] w-full  font-semibold  flex justify-center items-center gap-2 text-white ">
            <img src="/icons/content_copy.svg" alt="" />
            Copy number{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallAgent;
