"use client";

import Link from "next/link";
import React, { useState } from "react";
import ProfileMenuModal from "./modals/ProfileMenu";
import { ApiResponse } from "@/lib/Types";
import UserSkeleton from "./UserSkeleton";
import { calculateCombinedRating } from "@/utils/utils";
import EditProfileModal from "./modals/ProfileEditModal";
import { FaWhatsapp } from "react-icons/fa6";
interface UserDetailasProps {
  data: ApiResponse | null;
}

const UserDetailas: React.FC<UserDetailasProps> = React.memo(({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  console.log(data);
  return (
    <>
      {editProfileModal && (
        <EditProfileModal
          currentUser={data}
          onClose={() => setEditProfileModal(false)}
        />
      )}
      {!data ? (
        <UserSkeleton />
      ) : (
        <div className="w-full sm:max-w-430px sm:shadow sm:border pt-[100px]  sm:pt-[65px] text-[14px] rounded-[12px] sm:p-4 bg-white">
          {/* User image and menu button */}
          <div className="flex w-full justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                src={data?.data.user.profilePicture}
                alt="User"
                className="w-16 h-16 border border-lblue rounded-full"
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
                <ProfileMenuModal
                  editProfile={() => setEditProfileModal(true)}
                  isOpen={isOpen}
                  toggleDropdown={toggleDropdown}
                  link={window.location.href}
                />
              </div>
            </div>
          </div>

          {/* User name and status */}
          <div className="flex items-center mb-4">
            <h1 className="text-[16px] font-bold mr-2">
              {data?.data.user.lastName + " " + data?.data.user.firstName}
            </h1>
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
              alt="Status"
              className="w-4 h-4 hidden"
            />
          </div>

          {/* Rating and reviews */}
          <div className="flex items-center mb-4">
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611975/utilities/LodgeMate_File/home_pin_nvfw3f.svg"
              alt="Rating"
              className="w-4 h-4 mr-1"
            />
            <p className="text-gray-600 text-[12px]">
              {" "}
              {/* {calculateCombinedRating(
                data?.data.user.ratings.lodgeRatings.totalRatings,
                data?.data.user.ratings.lodgeRatings.userCount,
                data?.data.user.ratings.serviceRatings.totalRatings,
                data?.data.user.ratings.serviceRatings.userCount
              )}{" "} */}
              (
              {data?.data.user.ratings.lodgeRatings.userCount +
                data?.data.user.ratings.serviceRatings.userCount}
              ) users left reviews
            </p>
          </div>

          {/* User description */}
          <div className="mb-4">
            <p>
              {data?.data.user.bio
                ? data?.data.user.bio
                : "please edit your bio"}
            </p>
          </div>

          <div className="flex mb-4 gap-2 items-center">
            {/* <Link href='/'>
              {" "}
              <img
                src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Facebook_ryntge.svg'
                alt='facebook'
                className='w-[24px] h-[24px] '
              />
            </Link> */}

            {data?.data.user.contact?.instagram && (
              <Link href={data.data.user.contact.instagram} target="_blank">
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Instagram_vwhjji.svg"
                  alt="ig"
                  className="w-[24px] h-[24px]"
                />
              </Link>
            )}

            {data?.data.user.contact?.whatsapp && (
              <Link href={data.data.user.contact.whatsapp} target="blank_">
                <FaWhatsapp className="w-[24px] h-[24px] text-gray-500" />
              </Link>
            )}
            {data?.data.user.contact?.linkedin && (
              <Link href={data.data.user.contact.linkedin} target="blank_">
                {" "}
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/LinkedIn_a3gtp7.svg"
                  alt="linkedin"
                  className="w-[24px] h-[24px]"
                />
              </Link>
            )}
          </div>

          {/* User stats */}
          <div className="flex justify-between mb-2">
            <p className="font-bold-">Total lodges</p>
            <p className="font-bold">{data?.data.user.totalLodges}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-bol">Total services</p>
            <p className="font-bold">{data?.data.user.totalServices}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-bol">Lodge ratings</p>
            <p className="font-bold">
              {data?.data.user.ratings.lodgeRatings.userCount}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="font-bol">Service ratings</p>
            <p className="font-bold">
              {data?.data.user.ratings.serviceRatings.userCount}
            </p>
          </div>
        </div>
      )}
    </>
  );
});

export default UserDetailas;
