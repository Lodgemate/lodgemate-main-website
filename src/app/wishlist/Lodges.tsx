import React from "react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  type?: string;
  name: string;
  address?: string;
  university?: string;
  images?: string[];
  price: number;
  imageUrl: string;
  location: string;
  nearbyUniversity: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageUrl,
  name,
  location,
  nearbyUniversity,
  price,
}) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className="max-w-sm rounded overflow-hidden">
      <Link href={`/lodges/lodge_details/${id}`} passHref>
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
        <div className="font-bold text-[16px] flex items-start">{name} </div>
        <p className="text-lgray text-[16px]">{location}</p>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className="mr-2"
          />
          <p className="text-[13px]">
            {" "}
            <span>{nearbyUniversity}</span>
          </p>
        </div>
        <p className="text-dgray text-[15px] font-semibold mt-4">
          {formattedPrice}/yr
        </p>
      </div>
    </div>
  );
};

const lodges = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",

    name: "Cozy Mountain Lodge",
    location: "123 Mountain Rd, Colorado Springs, CO",
    nearbyUniversity: "University One",
    price: 50000,
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",

    name: "Sunny Riverside Lodge",
    location: "456 River St, Austin, TX",
    nearbyUniversity: "University Two",
    price: 60000,
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",

    name: "Green Valley Lodge",
    location: "789 Valley Rd, San Francisco, CA",
    nearbyUniversity: "University Three",
    price: 70000,
  },
  {
    id: 4,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",

    name: "Lodge Four",
    location: "Location Four",
    nearbyUniversity: "University Four",
    price: 80000,
  },
  {
    id: 5,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
    name: "Lodge Five",
    location: "Location Five",
    nearbyUniversity: "University Five",
    price: 90000,
  },
  {
    id: 6,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",

    name: "Lodge Six",
    location: "Location Six",
    nearbyUniversity: "University Six",
    price: 100000,
  },
  {
    id: 7,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",

    name: "Lodge Seven",
    location: "Location Seven",
    nearbyUniversity: "University Seven",
    price: 110000,
  },
];

function Lodges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {lodges.map((lodge) => (
        <ProductCard
          key={lodge.id}
          id={lodge.id}
          imageUrl={lodge.imageUrl}
          name={lodge.name}
          location={lodge.location}
          nearbyUniversity={lodge.nearbyUniversity}
          price={lodge.price}
        />
      ))}
    </div>
  );
}

export default Lodges;
