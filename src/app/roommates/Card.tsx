import React from "react";
import { Roommate } from "./data";



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
  return (
    <button onClick={onClick} className="max-w-sm rounded overflow-hidden  ">
      <div className="relative">
        <img
          className="w-full h-[144px] sm:h-[200px] object-cover rounded-[12px]"
          src={imageUrl}
          alt={name}
        />
        {/* <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223206/utilities/LodgeMate_File/Lodge_icon_xw9bll.svg"
          alt="lodgemate"
          className="absolute top-2 left-2 text-xl"
        /> */}
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
      </div>
      <div className=" py-[15px]">
        <div className="font-bold text-[16px] flex items-start">
          {name}{" "}
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
            alt="verified"
            className=" ml-2"
          />
        </div>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className="mr-2 pl-1"
          />
          <p className="text-[13px]">
            {" "}
            <span>{nearbyUniversity}</span>
          </p>
        </div>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/iconamoon_profile-thin_hkgtcv.svg"
            alt=""
            className="mr-2"
          />
          <p className="text-[13px]">
            {" "}
            <span>{sex}</span>
          </p>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
