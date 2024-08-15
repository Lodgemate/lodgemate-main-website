import type { InferGetStaticPropsType, GetStaticProps } from 'next'

import ProductCard from "@/components/Lodges/profileLodges";
import Link from "next/link";
import React from "react";
import { useAppSelector } from '@/lib/hooks';
import { selectAllUsersdata } from '@/lib/features/Users/usersSlice';

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




const LodgeListed: React.FC = React.memo(() => {
console.log("UserData")
// console.log(UserData)





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
});

export default LodgeListed;
