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
            className="w-full h-[144px] sm:h-[200px] object-cover rounded-[12px]"
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
        <div className="font-bold text-[14px] flex items-start">{name} </div>
        <p className="text-lgray text-[12px]">{location}</p>
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

interface LodgesProps{
  lodges:any[]| []
}
const Lodges:React.FC<LodgesProps>=({ lodges} )=> {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {lodges.map((lodge) => (
        <ProductCard
          key={lodge.lodge._id}
          id={lodge.lodge._id}
          imageUrl={lodge.lodge.coverphoto}
          name={lodge.lodge.lodgeName}
          location={lodge.lodge.address_text}
          nearbyUniversity={lodge.lodge.administrativeArea}
          price={lodge.lodge.price}
        />
      ))}
    </div>
  );
}

export default Lodges;
