import Link from "next/link";
import React from "react";
import products, { Product } from "./data";
import AOS from "aos";
import HeartIcon from "./SaveIcon";

interface ProductCardProps {
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
  images: string[];
  price: number; // Ensure this is always a number
  imageUrl: string;
  state: string;
  location: string;
  nearbyUniversity: string;
  wishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  wishlisted,
  id,
  imageUrl,
  name,
  location,
  nearbyUniversity,
  price,
  state,
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
  console.log(wishlisted);
  return (
    <div
      // href={`/lodges/lodge_details/${id}`}
      // passHref
      className="max-w-sm rounded overflow-hidden z-[9]"
      data-aos="fade-up"
    >
      <div className="relative ">
        <Link href={`/lodges/lodge_details/${id}`} passHref>
          <img
            className="w-full h-[144px] sm:h-[200px] object-cover rounded-[12px]"
            src={imageUrl}
            alt={name}
          />
        </Link>

        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223206/utilities/LodgeMate_File/Lodge_icon_xw9bll.svg"
          alt="lodgemate"
          className="absolute top-2 left-2 text-xl hidden"
        />
        <HeartIcon type={"lodge"} id={id} wishlisted={wishlisted} />
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
          alt=""
          className="absolute bottom-4 right-[40%]  text-xl"
        />
      </div>
      <div className=" py-[15px]">
        <div className="font-bold text-[14px] flex items-start mb-1">
          <p className="capitalize">{name}</p>{" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
            alt="verified"
            className=" ml-2 hidden"
          />
        </div>
        <p className="text-lgray text-[12px] capitalize mb-1">{location}</p>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className="mr-1"
          />
          <p className="text-[12px] capitalize">
            {" "}
            <span>
              {nearbyUniversity}, {state}
            </span>
          </p>
        </div>
        <p className="text-dgray text-[14px] font-semibold mt-2">
          {formattedPrice}/yr
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
