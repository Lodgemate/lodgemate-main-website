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
  status: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageUrl,
  name,
  location,
  nearbyUniversity,
  price,
  status,
}) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);

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
      <Link href={`/lodges/lodge_details/${id}`} passHref>
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
        <div className="font-bold text-[16px] flex items-start">{name}</div>
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
    status: "Pending",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",

    name: "Sunny Riverside Lodge",
    location: "456 River St, Austin, TX",
    nearbyUniversity: "University Two",
    price: 60000,
    status: "Pending",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",

    name: "Green Valley Lodge",
    location: "789 Valley Rd, San Francisco, CA",
    nearbyUniversity: "University Three",
    price: 70000,
    status: "Approved",
  },
  {
    id: 4,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",

    name: "Lodge Four",
    location: "Location Four",
    nearbyUniversity: "University Four",
    price: 80000,
    status: "Approved",
  },
  {
    id: 5,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",
    name: "Lodge Five",
    location: "Location Five",
    nearbyUniversity: "University Five",
    price: 90000,
    status: "Approved",
  },
  {
    id: 6,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",

    name: "Lodge Six",
    location: "Location Six",
    nearbyUniversity: "University Six",
    price: 100000,
    status: "Denied",
  },
  {
    id: 7,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821883/utilities/LodgeMate_File/sd_v2047z.png",

    name: "Lodge Seven",
    location: "Location Seven",
    nearbyUniversity: "University Seven",
    price: 110000,
    status: "Denied",
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
          status={lodge.status}
        />
      ))}
    </div>
  );
}

export default Lodges;
