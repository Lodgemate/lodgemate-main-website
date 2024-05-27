import React from "react";
import Card from "./Card";
import products from "../../data/data"; // Importing the products data

function BrowseServices() {
  return (
    <div className="px-4 sm:px-[100px] mt-[50px]">
      <h1 className="text-[18px] sm:text-[24px] text-lgray mb-[24px]">
        Showing lodges based on your location
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products
          .filter((product) => product.type === "service") // Filtering to only show lodges
          .map((product, index) => (
            <Card
              key={index}
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
}

export default BrowseServices;
