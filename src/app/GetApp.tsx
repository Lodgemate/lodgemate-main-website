"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function GetApp() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // Show pop-up after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {" "}
      {showPopup && (
        <div className=" flex justify-center ">
          <div className="popup max-w-[550px]  flex  flex-col sm:flex-row sm:items-center  p-4 border  rounded-md items-start justify-center gap-2 fixed bottom-[100px] sm:bottom-4 z-10 w-full bg-white shadow-lg">
            <button
              onClick={closePopup}
              className=" text-end w-full flex justify-end sm:justify-center sm:w-fit "
            >
              <p className=" border- px- rounded-full- mr-[1px] font-bold flex text-end">
                x
              </p>
            </button>
            <div className=" flex items-center gap-2">
              {" "}
              <Image
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961598/utilities/LodgeMate_File/Lodge_icon_pptxxh.svg"
                width={60}
                height={20}
                alt=""
                className="border rounded-lg"
              />
              <p className="text-[12px] sm:w-[200px]">
                Install our app now for easier access and the full experience.{" "}
              </p>
            </div>{" "}
            <div className="flex space-x-4 items-center w-full text-[10px] justify-center pb-2 sm:pb-0 pt-4 sm:pt-0">
              <a
                href="https://www.apple.com/app-store/"
                className="flex items-center px-2 sm:min-w-[130px] min-w-1/2  py-2 border border-black rounded-md bg-black text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1724861195/utilities/LodgeMate_File/apple_g926cz.png"
                  alt="Apple Logo"
                  className="h-6 mr-2"
                />
                <div className="flex flex-col items-start">
                  <p className="text-">Download on </p>
                  <p className="text- font-bold">App Store</p>
                </div>
              </a>
              <a
                href="https://play.google.com/store"
                className="flex items-center px-4 py-2 border sm:min-w-[130px] min-w-1/2  border-black rounded-md bg-black text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1724861194/utilities/LodgeMate_File/google-play_r7dqqy.png"
                  alt="Google Play Logo"
                  className="h-6 mr-2"
                />
                <div className="flex  flex-col items-start">
                  <p className="text-[10px">GET IT ON</p>
                  <p className="text-[ font-bold">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetApp;
