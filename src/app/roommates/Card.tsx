import React from "react";
import { Roommate } from "./data";
import AOS from "aos";
import HeartIcon from "./SaveIcon";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  sex: string;
  location: string;
  nearbyUniversity: string;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  sex,
  location,
  nearbyUniversity,
  onClick,
}) => {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <button
      className="max-w-sm rounded overflow-hidden z-[9]  "
      data-aos="fade-up"
    >
      <div className="relative">
        <div onClick={onClick}>
          <img
            className="w-full h-[144px] sm:h-[200px] object-cover rounded-[12px]"
            src={imageUrl}
            alt={name}
          />
        </div>

        <HeartIcon />
        
      </div>
      <div className=" py-[15px]">
        <div className="font-bold text-[14px] flex items-start">
          <p className="capitalize">{name}</p>{" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
            alt="verified"
            className=" ml-2 hidden"
          />
        </div>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className="mr-2 pl"
          />
          <p className="text-[12px] capitalize">
            {" "}
            <span>{nearbyUniversity}</span>
          </p>
        </div>
        <div className="flex items-center -ml-1 mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/iconamoon_profile-thin_hkgtcv.svg"
            alt=""
            className="mr-2"
          />
          <p className="text-[12px] capitalize">
            {" "}
            <span>{sex}</span>
          </p>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
