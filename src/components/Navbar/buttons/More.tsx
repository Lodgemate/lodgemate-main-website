"use client"

import NotificationModal from "@/components/modals/NotificationModal";
import { Logout, selectAllAuthenticated } from "@/lib/features/Login/signinSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function More() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
const dispatch = useAppDispatch();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const NotificationShow = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const isAuthenticated =useAppSelector(selectAllAuthenticated)
  // if (!isAuthenticated) {
  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="">
      {/* desktop */}
      <div className="relative sm:block hidden">
        <div className="px-[13px] py-2 sm:block hidden rounded-[8px] bg-primary">
          <button
            onClick={toggleDropdown}
            className="flex relative text-[16px] text-white font-medium items-center gap-2"
          >
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719578480/utilities/LodgeMate_File/menu_ladlro.svg"
              height={24}
              width={24}
              alt="account"
            />
            More
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715962495/utilities/LodgeMate_File/Arrow---Down-2_brihdn.svg"
              height={8}
              width={8}
              alt="account"
            />
            <p className="bg-[red] absolute  -top-6 -right-5 rounded-[4px] px-[4px] text-white">
              3
            </p>{" "}
          </button>
        </div>
        {/* Dropdown modal */}
        {isDropdownOpen && (
          <div className="absolute right-0 w-[262px] mt-2 bg-white border border-gray-200 rounded-[12px] p-[10px] shadow-lg z-10">
            <div className=" absolute right-5 ">
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
              <button
                onClick={NotificationShow}
                className="flex text-gray-700  "
              >
                Notification{" "}
                <span className="bg-[red] rounded-[4px] px-[4px] text-white">
                  3
                </span>
              </button>
              {isNotificationOpen && (
                <div className="fixed top-[100px] right-[100px] bg-white z-50 border-b border-gray-200 rounded-[12px] py-[16px] shadow-lg">
                  <div className="flex relative justify-center pb-3 border-b  ">
                    <h1>Notifications</h1>
                    <button
                      className="text-gray-500 absolute right-4 top-0"
                      onClick={NotificationShow}
                    >
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
                  <NotificationModal />{" "}
                </div>
              )}

              <Link
                href="/user_profile/my_profile"
                className="text-gray-700 py-[5px]"
              >
                View profile
              </Link>
              <div className="bg-black opacity-[8%] w-full h-[1px]"></div>
              <Link
                href="/lodges/list_lodge"
                className="text-gray-700 py-[5px]"
              >
                List a lodge
              </Link>
              <Link
                href="/services_/list_service"
                className="text-gray-700 py-[5px]"
              >
                List your service
              </Link>
              <Link
                href="/roommates/find_a_roommate"
                className="text-gray-700 py-[5px]"
              >
                Request roommate
              </Link>
              <div className="bg-black opacity-[8%] w-full h-[1px]"></div>

              <Link href="/chat" className="text-gray-700 py-[5px]">
                Chats{" "}
                <span className="bg-[red] rounded-[4px] px-[4px] text-white">
                  1
                </span>
              </Link>
              <Link href="/wishlist" className="text-gray-700 py-[5px]">
                Wishlist{" "}
                <span className="bg-[red] rounded-[4px] px-[4px] text-white">
                  1
                </span>
              </Link>
              <Link
                href="/status_and_inventory"
                className="text-gray-700 py-[5px]"
              >
                Status & inventory
              </Link>
              <div className="bg-black opacity-[8%] w-full h-[1px]"></div>

              <Link href="/help_and_support" className="text-gray-700 py-[5px]">
                Help & Support
              </Link>
              <Link href="/settings" className="text-gray-700 py-[5px]">
                Settings
              </Link>
              <Link href="/" onClick={()=>{dispatch(Logout())}} className="text-gray-700 py-[5px]">
                Logout
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
            className=" relative flex text-[16px] text-dgr font-medium items-center gap-2"
          >
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719579104/utilities/LodgeMate_File/menu_1_kngbsl.png"
              height={24}
              width={24}
              alt="account"
            />
            More
            <Image
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715964624/utilities/LodgeMate_File/Vector_16_c8ivmb.svg"
              height={8}
              width={8}
              alt="account"
            />
            <p className="bg-[red] absolute  -top-4 -right-6 rounded-[4px] px-[4px] text-white">
              3
            </p>{" "}
          </button>
        </div>
        {/* Dropdown modal */}
        {isDropdownOpen && (
          <div className="absolute right-0 w-[197px] mt-2 bg-white border border-gray-200 rounded-[12px] p-[16px] shadow-lg z-10">
            <div className="absolute right-5 ">
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
              <Link href="/" className="text-gray-700  ">
                Notification{" "}
                <span className="bg-[red] rounded-[4px] px-[4px] text-white">
                  3
                </span>
              </Link>
              <Link
                href="/user_profile/my_profile"
                className="text-gray-700 py-[5px]"
              >
                View profile
              </Link>
              <div className="bg-black opacity-[8%] w-full h-[1px]"></div>
              <Link
                href="/lodges/list_lodge"
                className="text-gray-700 py-[5px]"
              >
                List a lodge
              </Link>
              <Link
                href="/services_/list_service"
                className="text-gray-700 py-[5px]"
              >
                List your service
              </Link>
              <Link
                href="/roommates/find_a_roommate"
                className="text-gray-700 py-[5px]"
              >
                Request roommate
              </Link>
              <div className="bg-black opacity-[8%] w-full h-[1px]"></div>

              <Link href="/chat" className="text-gray-700 py-[5px]">
                Chats{" "}
                <span className="bg-[red] rounded-[4px] px-[4px] text-white">
                  1
                </span>
              </Link>
              <Link href="/wishlist" className="text-gray-700 py-[5px]">
                Wishlist{" "}
                <span className="bg-[red] rounded-[4px] px-[4px] text-white">
                  1
                </span>
              </Link>
              <Link
                href="/status_and_inventory"
                className="text-gray-700 py-[5px]"
              >
                Status & inventory
              </Link>
              <div className="bg-black opacity-[8%] w-full h-[1px]"></div>

              <Link href="/help_and_support" className="text-gray-700 py-[5px]">
                Help & Support
              </Link>
              <Link href="/settings" className="text-gray-700 py-[5px]">
                Settings
              </Link>
              <Link href="/" onClick={()=>{dispatch(Logout())}} className="text-gray-700 py-[5px]">
                Logout
              </Link>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default More;
