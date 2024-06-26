import React, { useState, useEffect } from "react";
import Card from "./Card";
import products, { Product } from "./data";
import FilterOptions from "./FilterOptions";

interface BrowseLodgesProps {
  query: string;
  isSearchTriggered: boolean;
}

const BrowseLodges: React.FC<BrowseLodgesProps> = ({
  query,
  isSearchTriggered,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [showMore, setShowMore] = useState(false);

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

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleResetFilters = () => {
    setFilters({});
    setFilteredProducts(products); // Resetting to all products
  };

  const handleApplyFilters = (appliedFilters: any) => {
    setFilters(appliedFilters);
    // Logic to filter the product list based on appliedFilters
    const filtered = products.filter((product) => {
      const matchesPrice =
        (!appliedFilters.minPrice ||
          product.price >= appliedFilters.minPrice) &&
        (!appliedFilters.maxPrice || product.price <= appliedFilters.maxPrice);
      const matchesType =
        !appliedFilters.accommodationType.length ||
        appliedFilters.accommodationType.includes(product.accommodationType);
      const matchesRooms =
        !appliedFilters.rooms.length ||
        appliedFilters.rooms.includes(String(product.numberOfRooms));
      const matchesOccupants =
        !appliedFilters.occupants.length ||
        appliedFilters.occupants.includes(String(product.numberOfRooms));
      const matchesFeatures =
        !appliedFilters.features.length ||
        appliedFilters.features.every((feature: string) =>
          product.features.map((f) => f.name).includes(feature)
        );

      return (
        matchesPrice &&
        matchesType &&
        matchesRooms &&
        matchesOccupants &&
        matchesFeatures
      );
    });
    setFilteredProducts(filtered);
    setShowFiltersModal(false); // Close modal after applying filters
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowFiltersModal(false);
    }
  };

  return (
    <div className="px-4 sm:px-[100px] mt-[50px]">
      <div className="flex justify-between gap-8 items-center text-lgray mb-[24px]">
        <h1 className="text-[18px] flex flex-wrap sm:text-[24px] text-lgray ">
          {isSearchTriggered
            ? `Showing results for "${query}"`
            : "Showing lodges based on your location"}
        </h1>

        <button
          onClick={() => setShowFiltersModal(true)}
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

      <div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts
            .filter((product) => product.type === "lodge") // Filtering to only show lodges
            .slice(0, showMore ? filteredProducts.length : 8) // Show only the first 8 items initially, then all when showMore is true
            .map((product) => (
              <Card
                {...product}
                key={product.id}
                imageUrl={product.images[0]} // Using the first image
                name={product.name}
                location={product.address}
                nearbyUniversity={product.university}
                price={product.price || 0}
              />
            ))}
        </div>

        {!showMore && (
          <div className="mt-10 flex flex-col justify-center items-center text-lgray font-medium pb-[200px]">
            <p className="text-[16px] pb-[16px] ">Continue exploring lodges</p>
            <button
              className="border px-4 py-2 rounded-[12px]"
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      {showFiltersModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 px-1 bg-black bg-opacity-25 flex justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="bg-white  rounded-[20px]  w-[768px] mt-6 max-h-[80vh] no-scrollbar overflow-y-auto">
            {/* Header */}
            <div className="flex relative justify-center p-2 items-center mb- border-b bor">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="text-gray-500  absolute right-4 top-2 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <FilterOptions
              onResetFilters={handleResetFilters}
              onApplyFilters={handleApplyFilters}
              onClose={() => setShowFiltersModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseLodges;
