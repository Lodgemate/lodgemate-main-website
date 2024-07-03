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
            className="w-full h-[144px] sm:h-[299px] object-cover rounded-[12px]"
            src={imageUrl}
            alt={name}
          />

          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719973782/utilities/LodgeMate_File/Heart_Icon_ickosd.svg"
            alt="heart"
            className="absolute top-2 right-2 text-xl"
          />
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

const serivices = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagewerty_teprzd.png",

    name: "Jeniffer Uba",
    location: "123 Mountain Rd, Colorado Springs, CO",
    nearbyUniversity: "University One",
    sex: "male",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397590/utilities/LodgeMate_File/Imageertyu_oqeuut.png",

    name: "Sunny Riverside",
    location: "456 River St, Austin, TX",
    nearbyUniversity: "University Two",
    sex: "female",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397588/utilities/LodgeMate_File/Imagesfdghjk_ofiz6j.png",

    name: "Green Valley",
    location: "789 Valley Rd, San Francisco, CA",
    nearbyUniversity: "University Three",
    sex: "female",
  },
  {
    id: 4,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716397589/utilities/LodgeMate_File/Imagegjhk_rtnogl.png",

    name: "Lodge Four",
    location: "Location Four",
    nearbyUniversity: "University Four",
    sex: "female",
  },
];

function Serivices() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {serivices.map((service) => (
        <Card
          key={service.id}
          id={service.id}
          imageUrl={service.imageUrl}
          name={service.name}
          location={service.location}
          nearbyUniversity={service.nearbyUniversity}
          sex={service.sex}
        />
      ))}
    </div>
  );
}

export default Serivices;
