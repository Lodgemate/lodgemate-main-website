import ChatBtn from "@/components/Shared/chatBtn";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { Roommate } from "@/lib/Types";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import ReportProfile from "../modals/ReportProfile";
import { MdLocationPin } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";

interface ProfileDetailsProps {
  roommate: Roommate;
  onClose: () => void;
}

const hobbyIcons: { [key: string]: string } = {
  musician:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  dancer:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/game-icons_party-hat_xrupol.svg",
  artist:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407628/utilities/LodgeMate_File/streamline_interface-edit-magic-wand-design-magic-star-supplies-tool-wand_shufta.svg",
  "book warm":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407628/utilities/LodgeMate_File/gg_read_tptvwk.svg",
  "football addict":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  gamer:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  foodie:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  evangelism:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  volunteering:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  fitness:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  "Party freak":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  neat: "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  fashionista:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  techy:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  gister:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  "Make-up artist":
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  writer:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407630/utilities/LodgeMate_File/Group_1_txdty2.svg",
  photography:
    "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718407628/utilities/LodgeMate_File/streamline_interface-edit-magic-wand-design-magic-star-supplies-tool-wand_shufta.svg",
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  roommate,
  onClose,
}) => {
  const [openreport, setopenreport] = useState(false);
  const currentUserData = useAppSelector(selectAllUsersdata);
  const chatDetails = {
    firstName: roommate.postedBy.firstName,
    lastName: roommate.postedBy.lastName,
    gender: roommate.postedBy.gender,
    sender: currentUserData?.data.user._id,
    reciver: roommate.postedBy._id,
    roomId: `${roommate.postedBy._id}-${currentUserData?.data.user._id}`,
    profilePicture: roommate.postedBy.profilePicture,
    area: roommate.postedBy.administrativeArea,
  };

  const optimizeImageUrl = (url: string) => {
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/w_300,f_auto/");
    }
    return url;
  };

  return (
    <div className="">
      <ReportProfile
        roommateId={roommate.postedBy._id}
        type={"user"}
        show={openreport}
        onClose={() => setopenreport(false)}
      />
      <div className=" flex fixed justify-center w-full bg- left-0 top-[10px] text-[14px] overflow-y-auto text-dgray  z-[990] ">
        <div className="w-[500px] h-[400px] bg-white border shadow-lg rounded-[20px] overflow-y-auto no-scrollbar ">
          <div className="relative flex justify-center items-center p-4 border-b">
            <p>Profile details</p>
            <button
              className="absolute top-0 right-0 mb-4 p-4 rounded-full"
              onClick={onClose}
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718851772/utilities/LodgeMate_File/Group_23_j5sjal.svg"
                alt="cancle"
              />
            </button>{" "}
          </div>

          <div className="flex justify-center items-center flex-col mt-4 gap-4 px-4 ">
            <div className="w-[150px] h-[150px]  border rounded-full ">
              <Image
                src={roommate.postedBy.profilePicture}
                alt={roommate.postedBy.firstName}
                width={100}
                height={100}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <p className="text-[20px] font-semibold">
              {roommate.postedBy.firstName}
            </p>
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-2 items-center">
                <MdLocationPin className="h-5 w-5" />
                <p>
                  Near <span>{roommate.subAdministrativeArea}</span>{" "}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <BsPersonFill className="h-5 w-5" />

                <p> {roommate.postedBy.gender}</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <IoHome className="h-5 w-5" />
                {roommate.preferredAccomodationTypes.map((houseType: any) => {
                  return <p key={houseType}> {houseType}</p>;
                })}
              </div>{" "}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/House_1_fpt0yj.svg"
                alt=""
              />
              <p>Living arrangements {roommate.preferredLivingArrangement}</p>
            </div>{" "}
            <div className="flex flex-col items-center ">
              <h2 className="text-center text-[20px] font-semibold pb-4">
                Who I’m looking for!
              </h2>
              <p className="text-center text-black">
                {roommate.preferredRoommateDescription}
              </p>
            </div>
            <div className="flex  justify-center flex-col items-center">
              <h2 className="text-[20px] font-semibold text-center">
                Hobbies & Traits
              </h2>
              <div className="flex flex-wrap items-center justify-center mt-4 gap-4">
                {roommate.hobbiesAndTraits.map((hobby) => (
                  <div
                    key={hobby}
                    className="flex items-center border px-4 py-2 rounded-lg gap-2"
                  >
                    <img src={hobbyIcons[hobby]} alt={hobby} />
                    <p>{hobby}</p>
                  </div>
                ))}
              </div>

              <div className="">
                {roommate.contact && (
                  <h2 className="text-center pt-8 text-[20px] font-semibold">
                    Contact details
                  </h2>
                )}{" "}
                <div className="flex items-center justify-center gap-4 py-4">
                  {roommate.contact?.instagram && (
                    <Link href={roommate.contact.instagram} target="blank_">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Instagram_vwhjji.svg"
                        alt=""
                      />
                    </Link>
                  )}{" "}
                  {roommate.contact?.instagram && (
                    <Link href={roommate.contact.instagram} target="blank_">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Twitter_ffgjak.svg"
                        alt=""
                      />
                    </Link>
                  )}{" "}
                  {roommate.contact?.instagram && (
                    <Link href={roommate.contact.instagram} target="blank_">
                      <img
                        src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/LinkedIn_a3gtp7.svg"
                        alt=""
                      />
                    </Link>
                  )}
                </div>
                <div className="py-4 flex gap-2 items-center">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718410116/utilities/LodgeMate_File/flag_ul6f0p.svg"
                    alt=""
                  />
                  <Link href="">
                    <p
                      className="text-lred underline"
                      onClick={() => setopenreport(true)}
                    >
                      Report profile
                    </p>
                  </Link>
                </div>
              </div>
              <ChatBtn details={chatDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
