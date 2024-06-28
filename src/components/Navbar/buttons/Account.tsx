"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Account() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* desktop */}
      <div className="relative sm:block hidden">
        <div className="p-[13px] sm:block hidden rounded-[8px] bg-primary">
          <button
            onClick={toggleDropdown}
            className="flex text-[16px] text-white font-medium items-center gap-2"
          >
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715963878/utilities/LodgeMate_File/account_circle_2_sury28.svg"
              height={24}
              width={24}
              alt="account"
            />
            Account
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715962495/utilities/LodgeMate_File/Arrow---Down-2_brihdn.svg"
              height={8}
              width={8}
              alt="account"
            />
          </button>
        </div>
        {/* Dropdown modal */}
        {isDropdownOpen && (
          <div className="absolute right-0 w-[262px] mt-2 bg-white border border-gray-200 rounded-[12px] p-[16px] shadow-lg z-10">
            <div className="flex justify-end ">
              <button className="text-gray-500" onClick={toggleDropdown}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[16px] p-2">
              <Link href="/auth/signup" className="text-gray-700 py-[5px] ">
                Create account
              </Link>
              <Link href="/auth/login" className="text-gray-700 py-[5px]">
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Mobile */}
      <div className="relative sm:hidden ">
        <div className="p-[13px] sm:hidden rounded-[8px] bg-white border-2 border-stroke">
          <button
            onClick={toggleDropdown}
            className="flex text-[16px] text-dgr font-medium items-center gap-2"
          >
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715964579/utilities/LodgeMate_File/account_circle_3_lyjkcy.svg"
              height={24}
              width={24}
              alt="account"
            />
            Account
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715964624/utilities/LodgeMate_File/Vector_16_c8ivmb.svg"
              height={8}
              width={8}
              alt="account"
            />
          </button>
        </div>
        {/* Dropdown modal */}
        {isDropdownOpen && (
          <div className="absolute right-0 w-[197px] mt-2 bg-white border border-gray-200 rounded-[12px] p-[16px] shadow-lg z-10">
            <div className="flex justify-end ">
              <button className="text-gray-500" onClick={toggleDropdown}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 text-[16px] p-2">
              <Link href="/auth/signup" className="text-gray-700 py-[5px] ">
                Create account
              </Link>
              <Link href="/auth/login" className="text-gray-700 py-[5px]">
                Profile
              </Link>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default Account;
