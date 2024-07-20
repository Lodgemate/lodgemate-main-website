import Link from "next/link";
import React from "react";
import products, { Product } from "./data";
import AOS from "aos";




interface ProductCardProps {
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
  images: string[];
  price: number; // Ensure this is always a number
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

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <div className="max-w-sm rounded overflow-hidden  " data-aos="fade-up">
      <Link href={`/lodges/lodge_details/${id}`} passHref className="relative">
        <img
          className="w-full h-[144px] sm:h-[299px] object-cover rounded-[12px]"
          src={imageUrl}
          alt={name}
        />
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223206/utilities/LodgeMate_File/Lodge_icon_xw9bll.svg"
          alt="lodgemate"
          className="absolute top-2 left-2 text-xl"
        />
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223206/utilities/LodgeMate_File/ph_heart-fill_ia430a.svg"
          alt=""
          className="absolute top-2 right-2  text-xl"
        />
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
          alt=""
          className="absolute bottom-4 right-[40%]  text-xl"
        />
      </Link>
      <div className=" py-[15px]">
        <div className="font-bold text-[16px] flex items-start">
          {name}{" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
            alt="verified"
            className=" ml-2"
          />
        </div>
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

export default ProductCard;
