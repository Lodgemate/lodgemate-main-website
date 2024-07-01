import Link from "next/link";
import React from "react";

// Sample data
const products = [
  {
    id: 1,
    type: "lodge",
    name: "Lodge 1",
    address: "123 Street",
    university: "University A",
    images: [
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    ],
    price: 50000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",

    location: "14 cross avenue, Owerri, Imo state.",
    nearbyUniversity: "University A",
  },
  {
    id: 2,
    type: "lodge",
    name: "Lodge 2",
    address: "456 Avenue",
    university: "University B",
    images: ["/path/to/image2.jpg"],
    price: 60000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    location: "14 cross avenue, Owerri, Imo state.",
    nearbyUniversity: "University B",
  },
  {
    id: 3,
    type: "lodge",
    name: "Lodge 3",
    address: "789 Boulevard",
    university: "University C",
    images: ["/path/to/image3.jpg"],
    price: 70000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    location: "Location 3",
    nearbyUniversity: "University C",
  },
  {
    id: 4,
    type: "lodge",
    name: "Lodge 4",
    address: "101 Road",
    university: "University D",
    images: ["/path/to/image4.jpg"],
    price: 80000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    location: "Location 4",
    nearbyUniversity: "University D",
  },
  {
    id: 5,
    type: "lodge",
    name: "Lodge 5",
    address: "202 Street",
    university: "University E",
    images: ["/path/to/image5.jpg"],
    price: 90000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    location: "Location 5",
    nearbyUniversity: "University E",
  },
  {
    id: 6,
    type: "lodge",
    name: "Lodge 6",
    address: "303 Avenue",
    university: "University F",
    images: ["/path/to/image6.jpg"],
    price: 100000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716821887/utilities/LodgeMate_File/adsas_hbwgl2.png",
    location: "Location 6",
    nearbyUniversity: "University F",
  },
 

];

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

  return (
    <div className="max-w-sm rounded overflow-hidden ">
      <button className="relative">
        <img
          className="w-full h-[244px] sm:h-[200px] object-cover rounded-[12px]"
          src={imageUrl}
          alt={name}
        />
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223406/utilities/LodgeMate_File/Vector_aflwdv.png"
          alt="lodgemate"
          className="absolute top-2 left-2 text-xl"
        />
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719611975/utilities/LodgeMate_File/menu_cx8xja.svg"
          alt=""
          className="absolute top-2 right-2 bg-white h-6 w-6 rounded-full text-xl"
        />
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223205/utilities/LodgeMate_File/Indicators_psmeyv.svg"
          alt=""
          className="absolute bottom-4 right-[40%]  text-xl"
        />
      </button>
      <div className="py-[15px]">
        <div className="font-bold text-[14px] flex items-start">
          {name}
          
        </div>
        <p className="text-lgray text-[13px]">{location}</p>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className="mr-2"
          />
          <p className="text-[13px]">
            <span>{nearbyUniversity}</span>
          </p>
        </div>
        <p className="text-dgray text-[15px] font-semibold mt-2">
          {formattedPrice}/yr
        </p>
      </div>
    </div>
  );
};

const LodgeListed: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, 9).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            type={product.type}
            name={product.name}
            address={product.address}
            university={product.university}
            images={product.images}
            price={product.price}
            imageUrl={product.imageUrl}
            location={product.location}
            nearbyUniversity={product.nearbyUniversity}
          />
        ))}
      </div>
    </div>
  );
};

export default LodgeListed;
