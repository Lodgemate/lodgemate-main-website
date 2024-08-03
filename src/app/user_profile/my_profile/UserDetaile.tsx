"use client"

import Link from "next/link";
import React, { useState } from "react";
import ProfileMenuModal from "./modals/ProfileMenu";

const UserDetailas: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full sm:max-w-430px sm:shadow sm:border pt-[100px]  sm:pt-[65px] text-[14px] rounded-[12px] sm:p-4 bg-white">
      {/* User image and menu button */}
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611980/utilities/LodgeMate_File/Img_zqoo3o.svg"
            alt="User"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div className=" relative">
          <button className="p- rounded-full" onClick={toggleDropdown}>
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611975/utilities/LodgeMate_File/menu_cx8xja.svg"
              alt="Menu"
              className="w-6 h-6"
            />
          </button>
          <div className=" absolute bottom-0 right-0">
            <ProfileMenuModal isOpen={isOpen} toggleDropdown={toggleDropdown} />
          </div>
        </div>
      </div>

      {/* User name and status */}
      <div className="flex items-center mb-4">
        <h1 className="text-[24px] font-bold mr-2">John Doe</h1>
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
          alt="Status"
          className="w-4 h-4"
        />
      </div>

      {/* Rating and reviews */}
      <div className="flex items-center mb-4">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611975/utilities/LodgeMate_File/home_pin_nvfw3f.svg"
          alt="Rating"
          className="w-4 h-4 mr-2"
        />
        <p className="text-gray-600 text-[12px]">4.2 (19 people)</p>
      </div>

      {/* User description */}
      <div className="mb-4">
        <p>
          I'm John and I'm on Lodgemate to connect with students and make their
          life easier. With over 27 reviews and ratings from past clients, so
          you can be sure you're in good hands. Whether you're looking for a new
          place to live or need a hand fixing something around your lodge, I'm
          here to help.
        </p>
      </div>

      <div className="flex mb-4 gap-2 items-center">
        <Link href="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Facebook_ryntge.svg"
            alt="facebook"
            className="w-[24px] h-[24px] "
          />
        </Link>

        <Link href="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Instagram_vwhjji.svg"
            alt="ig"
            className="w-[24px] h-[24px] "
          />
        </Link>
        <Link href="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Twitter_ffgjak.svg"
            alt="twitter"
            className="w-[24px] h-[24px] "
          />
        </Link>
        <Link href="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/LinkedIn_a3gtp7.svg"
            alt="linkedin"
            className="w-[24px] h-[24px]"
          />
        </Link>
      </div>

      {/* User stats */}
      <div className="flex justify-between mb-2">
        <p className="font-bold-">Lodges listed</p>
        <p className="font-bold">13</p>
      </div>
      <div className="flex justify-between mb-2">
        <p className="font-bol">Services listed</p>
        <p className="font-bold">4</p>
      </div>
      <div className="flex justify-between mb-2">
        <p className="font-bol">Ratings & reviews</p>
        <p className="font-bold">27</p>
      </div>
    </div>
  );
};

export default UserDetailas;
