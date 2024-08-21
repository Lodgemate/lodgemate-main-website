import { ServiceApiResponse } from "@/lib/Types";
import React from "react";

// Sample data
const services = [
  {
    id: 1,
    type: "service",
    name: "Electrical rewiring service",
    address: "123 Street",
    category: "CIn Okigwe",
    images: [
      "https://example.com/path/to/image1.jpg",
      "https://example.com/path/to/image1.jpg",
    ],
    price: 50000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/esdjvcdh_gsgyzy.png",
    location: "Location 1",
    nearbyCategory: "In Okigwe",
  },
  {
    id: 2,
    type: "service",
    name: "Room refresh & painting",
    address: "456 Avenue",
    category: "Category B",
    images: ["https://example.com/path/to/image2.jpg"],
    price: 60000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399836/utilities/LodgeMate_File/fsddvgsajh_zcl8xg.png",
    location: "Location 2",
    nearbyCategory: "In Okigwe",
  },
  {
    id: 3,
    type: "service",
    name: "Chudi furniture making & repair",
    address: "789 Boulevard",
    category: "Category C",
    images: ["https://example.com/path/to/image3.jpg"],
    price: 70000,
    imageUrl:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716399839/utilities/LodgeMate_File/sddc_yhmgjy.png",
    location: "Location 3",
    nearbyCategory: "In Okigwe",
  },
  // Add more services as needed
];

interface ServiceCardProps {
  id?: number;
  type?: string;
  name?: string;
  address?: string;
  category?: string;
  images?: string[];
  price: number;
  imageUrl?: string;
  location: string;
  nearbyCategory?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  imageUrl,
  name,
  location,
  nearbyCategory,
  price,
}) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className="max-w-sm rounded overflow-hidden">
      <button className="relative ">
        <img
          className="sm:w-[500px] w-[240pc] h-[244px] sm:h-[200px]  rounded-[12px]"
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
        {/* Additional icons or overlays can be added here */}
      </button>
      <div className="py-[15px]">
        <div className="font-bold text-[14px] flex items-start">{name}</div>
        <p className="text-lgray text-[13px]">
          I offer electrical rewiring services with lorem ipsum dolor sit amet,
          consectetur dolor sit amet, consectetudolor sit amet add
        </p>
        <div className="flex items-center mt-[4px] text-gray-600">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716223199/utilities/LodgeMate_File/home_pin_mimpts.svg"
            alt=""
            className="mr-2"
          />
          <p className="text-[13px]">{nearbyCategory}dsds</p>
        </div>
        <p className="text-dgray text-[15px] font-semibold mt-2">
          {formattedPrice}/yr
        </p>
      </div>
    </div>
  );
};
interface serviceListedProps{
  data: ServiceApiResponse | null
}

const ServicesListed: React.FC<serviceListedProps> = ({data}) => {
  console.log(data)
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.data.services.slice(0, 9).map((service) => (
          <ServiceCard
            key={String(service._id)}
            id={Number(service._id)}
            // type={service.t}
            name={service.serviceName}
            address={service.address_text}
            // category={service.serviceCategories}
            images={service.photos}
            price={service.maxPrice}
            imageUrl={service.coverphoto}
            location={service.address_text}
            // nearbyCategory={service.nearbyCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesListed;
