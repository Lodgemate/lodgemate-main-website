import React from "react";
import AOS from "aos";
import Link from "next/link";
import HeartIcon from "./SaveIcon";


interface ProductCardProps {
  id: any;
  imageUrl: string;
  name: string;
  location: string;
  nearbyUniversity: string;
  price: any;
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
    <div className="max-w-sm rounded overflow-hidden " data-aos="fade-up">
      <div>
        <div className="relative">
          <Link href={`/services_/service_details/${id}`} passHref>
            <img
              className="w-full h-[144px] sm:h-[200px] object-cover rounded-[12px]"
              src={imageUrl}
              alt={name}
            />
          </Link>
          {/* <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223206/utilities/LodgeMate_File/Lodge_icon_xw9bll.svg"
          alt="lodgemate"
          className="absolute top-2 left-2 text-xl"
        /> */}
          <HeartIcon />
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
            alt=""
            className="absolute bottom-4 right-[40%]  text-xl"
          />
        </div>
        <div className=" py-[15px]">
          <div className="font-bold text-[14px] capitalize flex items-start">
            {name}{" "}
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
              alt="verified"
              className=" ml-2"
            />
          </div>
          <p className="text-lgray text-[12px] capitalize">{location}</p>
          <div className="flex items-center mt-[4px] text-gray-600">
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
              alt=""
              className="mr-2"
            />
            <p className="text-[12px] capitalize">
              {" "}
              <span>{nearbyUniversity}</span>
            </p>
          </div>
          <p className="text-dgray text-[14px] font-semibold capitalize mt-4">
            {formattedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
