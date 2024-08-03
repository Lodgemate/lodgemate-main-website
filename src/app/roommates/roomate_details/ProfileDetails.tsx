import { Roommate } from "@/lib/Types";
import Link from "next/link";
import React from "react";


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
  return (
    <div className="">
      <div className=' flex fixed justify-center w-full bg- left-0 top-[100px] overflow-y-auto text-dgray text-[16px] z-50 '>
        <div className='w-[500px] h-[400px] bg-white border shadow-lg rounded-[20px] overflow-y-auto no-scrollbar '>
          <div className='relative flex justify-center items-center p-4 border-b'>
            <p>Profile details</p>
            <button
              className='absolute top-0 right-0 mb-4 p-4 rounded-full'
              onClick={onClose}
            >
              <img
                src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718851772/utilities/LodgeMate_File/Group_23_j5sjal.svg'
                alt='cancle'
              />
            </button>{" "}
          </div>

          <div className='flex justify-center items-center flex-col gap-4 px-4 '>
            <div className='w-[150px] h-[150px]  overflow-hidden items-center mt-[24px] mb-[16px flex'>
              <img
                src={roommate.postedBy.profilePicture}
                alt={roommate.postedBy.firstName}
                className='rounded-full w-[150px] h-[150px]'
              />
            </div>
            <p className='text-[20px] font-semibold'>
              {roommate.postedBy.firstName}
            </p>
            <div className='flex items-center gap-5'>
              <div className='flex flex-col gap-2 items-center'>
                <img
                  src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337645/utilities/LodgeMate_File/home_pin_1_jvqqfs.svg                          '
                  alt=''
                />
                <p>
                  Near <span>{roommate.subAdministrativeArea}</span>{" "}
                </p>
              </div>
              <div className='flex flex-col gap-2 items-center'>
                <img
                  src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/iconamoon_profile-thin_hkgtcv.svg'
                  alt=''
                />
                <p> {roommate.postedBy.gender}</p>
              </div>
              <div className='flex flex-col gap-2 items-center'>
                <img
                  src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718408373/utilities/LodgeMate_File/covid_quarantine-place-self-lockdown-2_s4rvvo.svg'
                  alt=''
                />
                {roommate.preferredAccomodationTypes.map((houseType: any) => {
                  return <p key={houseType}> {houseType}</p>;
                })}
              </div>{" "}
            </div>
            <div className='flex flex-col gap-2 items-center'>
              <img
                src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/House_1_fpt0yj.svg'
                alt=''
              />
              <p>Living arrangements {roommate.preferredLivingArrangement}</p>
            </div>{" "}
            <div className='flex flex-col items-center '>
              <h2 className='text-center text-[20px] font-semibold pb-4'>
                Who I’m looking for!
              </h2>
              <p className='text-center text-black'>{roommate.preferredRoommateDescription}</p>
            </div>
            <div className='flex  justify-center flex-col items-center'>
              <h2 className='text-[20px] font-semibold text-center'>
                Hobbies & Traits
              </h2>
              <div className='flex flex-wrap items-center justify-center mt-4 gap-4'>
                {roommate.hobbiesAndTraits.map((hobby) => (
                  <div
                    key={hobby}
                    className='flex items-center border px-4 py-2 rounded-lg gap-2'
                  >
                    <img src={hobbyIcons[hobby]} alt={hobby} />
                    <p>{hobby}</p>
                  </div>
                ))}
              </div>

              <div className=''>
                <h2 className='text-center pt-8 text-[20px] font-semibold'>
                  Contact details
                </h2>{" "}
                <div className='flex items-center gap-4 py-4'>
                  <Link href={"/"}>
                    <img
                      src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Facebook_ryntge.svg'
                      alt=''
                    />
                  </Link>{" "}
                  <Link href={"/"}>
                    <img
                      src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Instagram_vwhjji.svg'
                      alt=''
                    />
                  </Link>{" "}
                  <Link href={"/"}>
                    <img
                      src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/Twitter_ffgjak.svg'
                      alt=''
                    />
                  </Link>{" "}
                  <Link href={"/"}>
                    <img
                      src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716939370/utilities/LodgeMate_File/LinkedIn_a3gtp7.svg'
                      alt=''
                    />
                  </Link>
                </div>
                <div className='py-4 flex gap-2 items-center'>
                  <img
                    src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718410116/utilities/LodgeMate_File/flag_ul6f0p.svg'
                    alt=''
                  />
                  <Link href=''>
                    <p className='text-lred underline'>Report profile</p>
                  </Link>
                </div>
              </div>
              <button className='py-4 w-full flex justify-center bg-primary font-medium text-white rounded-[8px] mb-4'>
                Chat with Jude
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
