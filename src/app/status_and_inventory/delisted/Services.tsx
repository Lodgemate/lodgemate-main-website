import React from "react";
import Link from "next/link";

interface CardProps {
  id: number;
  type?: string;
  name: string;
  address?: string;
  university?: string;
  images?: string[];
  price: number;
  imageUrl: string;
  description: string;
  nearbyUniversity: string;
  status: string;
}

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  name,
  description,
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
      <Link href={`/serivices/lodge_details/${id}`} passHref>
        <div className="relative">
          <img
            className="w-full h-[144px] sm:h-[200px] object-cover rounded-[12px]"
            src={imageUrl}
            alt={name}
          />

          <div
            className={`absolute px-2 py-1 bg-red-100 rounded-lg top-2 left-2 text-[12px] flex items-center gap-2`}
          >
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720098651/utilities/LodgeMate_File/error_a2ko9f.svg"
              alt={status}
            />
            <p>Delisted</p>
          </div>
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
            alt=""
            className="absolute bottom-4 right-[40%] text-xl"
          />
        </div>
      </Link>
      <div className="py-[15px]">
        <div className="font-bold text-[14px] flex justify-between items-start">
          {name}{" "}
        </div>
        <p className="text-lgray text-[12px]">{description}</p>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className="mr-2"
          />
          <p className="text-[12px]">
            {" "}
            <span>{nearbyUniversity}</span>
          </p>
        </div>
        <p className="text-dgray text-[14px] font-semibold mt-2">
          {formattedPrice}/yr
        </p>
      </div>
    </div>
  );
};

const serivices = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/esdjvcdh_gsgyzy.png",

    name: "Electrical rewiring service",
    description:
      "I offer electrical rewiring services with lorem ipsum dolor sit amet, consectetur dolor sit amet, consectetudolor sit amet add",
    nearbyUniversity: "University One",
    price: 50000,
    status: "Pending",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/fsddvgsajh_zcl8xg.png",

    name: "Room refresh & painting",
    description:
      "Hello there, we’re a room refresh and painting service with over 3 years of experience in the industry. Contact us for...",
    nearbyUniversity: "University Two",
    price: 60000,
    status: "Pending",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399839/utilities/LodgeMate_File/sddc_yhmgjy.png",

    name: "Chudi furniture making & repair",
    description:
      "I offer electrical rewiring services with lorem ipsum dolor sit amet, consectetur dolor sit amet, consectetudolor sit amet add",
    nearbyUniversity: "University Three",
    price: 70000,
    status: "Approved",
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
          description={service.description}
          nearbyUniversity={service.nearbyUniversity}
          price={service.price}
          status={service.status}
        />
      ))}
    </div>
  );
}

export default Serivices;
