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
  status: string;
}

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  name,
  location,
  nearbyUniversity,
  sex,
    status,
}) => {
  
let statusStyles = {
  backgroundColor: "",
  textColor: "",
  imageSrc: "",
  };
  
 switch (status) {
   case "Pending":
     statusStyles = {
       backgroundColor: "bg-yellow-100",
       textColor: "text-yellow-500",
       imageSrc:
         "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720098651/utilities/LodgeMate_File/hourglass_c3bjey.svg",
     };
     break;
   case "Approved":
     statusStyles = {
       backgroundColor: "bg-green-100",
       textColor: "text-green-500",
       imageSrc:
         "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720098651/utilities/LodgeMate_File/check_circle_xyrhoc.svg",
     };
     break;
   case "Denied":
     statusStyles = {
       backgroundColor: "bg-red-100",
       textColor: "text-red-500",
       imageSrc:
         "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720098651/utilities/LodgeMate_File/error_a2ko9f.svg",
     };
     break;
 }


  return (
    <div className="max-w-sm rounded overflow-hidden">
      <Link href={`/serivices/lodge_details/${id}`} passHref>
        <div className="relative">
          <img
            className="w-full h-[144px] sm:h-[299px] object-cover rounded-[12px]"
            src={imageUrl}
            alt={name}
          />

          <div
            className={`absolute px-2 py-1 rounded-lg top-2 left-2 text-[12px] flex items-center gap-2 ${statusStyles.backgroundColor} ${statusStyles.textColor}`}
          >
            <img src={statusStyles.imageSrc} alt={status} />
            <p>{status}</p>
          </div>
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
            alt=""
            className="absolute bottom-4 right-[40%] text-xl"
          />
        </div>
      </Link>
      <div className="py-[15px]">
        <div className="font-bold text-[16px] flex justify-between items-start">
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
          <p className="text-[13px]">
            {" "}
            <span>Near {nearbyUniversity}</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/iconamoon_profile-thin_hkgtcv.svg"
            alt="sex -ml-2"
          />
          <p className="text-dgray text-[15px]">{sex}</p>
        </div>
      </div>
    </div>
  );
};

const roommates = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagewerty_teprzd.png",

    name: "Jeniffer Uba",
    location: "123 Mountain Rd, Colorado Springs, CO",
    nearbyUniversity: "University One",
    sex: "male",
    status: "Pending",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397590/utilities/LodgeMate_File/Imageertyu_oqeuut.png",

    name: "Sunny Riverside",
    location: "456 River St, Austin, TX",
    nearbyUniversity: "University Two",
    sex: "female",
    status: "Pending",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397588/utilities/LodgeMate_File/Imagesfdghjk_ofiz6j.png",

    name: "Green Valley",
    location: "789 Valley Rd, San Francisco, CA",
    nearbyUniversity: "University Three",
    sex: "female",
    status: "Pending",
  },
  {
    id: 4,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagegjhk_rtnogl.png",

    name: "Lodge Four",
    location: "Location Four",
    nearbyUniversity: "University Four",
    sex: "female",
    status: "Pending",
  },
];

function Roommates() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {roommates.map((roommate) => (
        <Card
          key={roommate.id}
          id={roommate.id}
          imageUrl={roommate.imageUrl}
          name={roommate.name}
          location={roommate.location}
          nearbyUniversity={roommate.nearbyUniversity}
          sex={roommate.sex}
          status={roommate.status}
        />
      ))}
    </div>
  );
}

export default Roommates;
