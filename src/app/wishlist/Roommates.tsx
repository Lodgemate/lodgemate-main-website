import React from "react";
import Link from "next/link";

interface CardProps {
  id: number;
  type?: string;
  name: string;
  address?: string;
  university?: string;
  images?: string[];
  sex: string;
  imageUrl: string;
  location: string;
  nearbyUniversity: string;
}

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  name,
  location,
  nearbyUniversity,
  sex,
}) => {
  

  return (
    <div className="max-w-sm rounded overflow-hidden">
      <Link href={`/serivices/lodge_details/${id}`} passHref>
        <div className="relative">
          <img
            className="w-full h-[144px] sm:h-[200px] object-cover rounded-[12px]"
            src={imageUrl}
            alt={name}
          />

          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719973782/utilities/LodgeMate_File/Heart_Icon_ickosd.svg"
            alt="heart"
            className="absolute top-2 right-2 text-xl"
          />
        </div>
      </Link>
      <div className="py-[15px]">
        <div className="font-bold text-[14px] flex justify-between items-start">
          {name}{" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719975673/utilities/LodgeMate_File/tabler_home-check_ngykht.svg"
            alt="heart"
            className=""
          />
        </div>
        <div className="flex items-center gap-2 mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className=""
          />
          <p className="text-[12px]">
            {" "}
            <span>Near {nearbyUniversity}</span>
          </p>
        </div>
        <div className=" flex gap-2 items-center">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/iconamoon_profile-thin_hkgtcv.svg"
            alt="sex "
            className="-ml-1"
          />
          <p className="text-dgray text-[12px]">{sex}</p>
        </div>
      </div>
    </div>
  );
};



interface RoommatesProps{
  roommates:any[]| []
}
const Roommate:React.FC<RoommatesProps>=({ roommates} )=> {
  console.log(roommates)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {roommates.map((roommate) => (
        <Card
        //@ts-ignore
          key={roommate.roommate._id}
        //@ts-ignore
          id={roommate.roommate._id}
        //@ts-ignore
          imageUrl={roommate.roommate.postedBy.profilePicture}
        //@ts-ignore
        name={roommate.roommate.postedBy.firstName}
        //@ts-ignore
        location={roommate.roommate.postedBy.address_text}
        //@ts-ignore
        nearbyUniversity={roommate.roommate.postedBy.administrativeArea}
        //@ts-ignore
        sex={roommate.roommate.postedBy.gender}
        />
      ))}
    </div>
  );
}

export default Roommate;
