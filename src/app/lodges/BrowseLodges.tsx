"use client";

import React, { useState, useEffect } from "react";
import Card from "./Card";
import products from "../../data/data"; // Importing the products data

interface BrowseLodgesProps {
  query: string;
  isSearchTriggered: boolean;
}

const BrowseLodges: React.FC<BrowseLodgesProps> = ({
  query,
  isSearchTriggered,
}) => {

    const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (isSearchTriggered) {
      const lowercaseQuery = query.toLowerCase();
      const newFilteredProducts = products.filter((product) => {
        return (
          product.type === "lodge" &&
          (product.name.toLowerCase().includes(lowercaseQuery) ||
            product.address.toLowerCase().includes(lowercaseQuery) ||
            product.university.toLowerCase().includes(lowercaseQuery))
        );
      });
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [query, isSearchTriggered]);

  
  return (
    <div className="px-4 sm:px-[100px] mt-[50px]">
      <div className="flex justify-between gap-8 items-center text-lgray mb-[24px]">
        <h1 className="text-[18px] flex flex-wrap sm:text-[24px] text-lgray ">
          {isSearchTriggered
            ? `Showing results for "${query}"`
            : "Showing lodges based on your location"}
        </h1>

        <button
          className={`${
            isSearchTriggered ? "flex" : "hidden"
          } border-2 border-black border-opacity-[40%] items-center gap-4 rounded-[8px] px-[16px] py-[10px]`}
        >
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717408109/utilities/LodgeMate_File/page_info_y6jhz3.svg"
            alt="filter"
          />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts
          .filter((product) => product.type === "lodge") // Filtering to only show lodges
          .map((product) => (
            <Card
              {...product}
              key={product.id}
              imageUrl={product.images[0]} // Using the first image
              name={product.name}
              location={product.address}
              nearbyUniversity={product.university}
              price={product.price || "N/A"}
            />
          ))}
      </div>
    </div>
  );
};

export default BrowseLodges;
