import React from "react";
import Card from "./Card";
import products from "../../data/data"; // Importing the products data

function BrowseLodges() {
  return (
    <div className="px-4 sm:px-[100px] mt-[50px]">
      <h1 className="text-[24px] text-lgray mb-[24px]">
        Showing lodges based on your location
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products
          .filter((product) => product.type === "lodge") // Filtering to only show lodges
          .map((product, index) => (
            <Card
              key={index}
              imageUrl={product.images[0]} // Using the first image
              name={product.name}
              location={product.address}
              nearbyUniversity={product.university}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
}

export default BrowseLodges;
