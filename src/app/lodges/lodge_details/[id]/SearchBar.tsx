"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import products from "../../data"; // Import the products data
import Link from "next/link";

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

interface Product {
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
}

interface SearchResult {
  lodges: Product[];
  cities: { id: number; address: string }[];
  schools: { id: number; university: string }[];
}


const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult>({
    lodges: [],
    cities: [],
    schools: [],
  });

  useEffect(() => {
    if (query) {
      const filteredResults = filterResults(query);
      setResults(filteredResults);
    } else {
      setResults({ lodges: [], cities: [], schools: [] });
    }
  }, [query]);

  const filterResults = (query: string): SearchResult => {
    const lowercaseQuery = query.toLowerCase();
    const lodges: Product[] = [];
    const cities: { id: number; address: string }[] = [];
    const schools: { id: number; university: string }[] = [];

    products.forEach((product: Product) => {
      if (product.type === "lodge") {
        if (
          product.name.toLowerCase().includes(lowercaseQuery) &&
          lodges.length < 3
        ) {
          lodges.push(product);
        }
        if (
          product.address.toLowerCase().includes(lowercaseQuery) &&
          cities.length < 3
        ) {
          cities.push({
            id: product.id,
            address: product.address.split(",")[1].trim(),
          });
        }
        if (
          product.university.toLowerCase().includes(lowercaseQuery) &&
          schools.length < 3
        ) {
          schools.push({ id: product.id, university: product.university });
        }
      }
    });

    return { lodges, cities, schools };
  };

  const handleSearchClick = () => {
    // onSearch(query);
    // setQuery("");
  };

  return (
    <div className="flex relative justify-center w-full items-center mt-[20px]">
      <div className="border-2 pl-[24px] p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[16px] h-[63px] shadow-lg">
        <input
          type="text"
          placeholder="Enter name of lodge, city or school"
          className="rounded-full sm:w-[300px] w-[250px] bg-white outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link href="/"
          // onClick={handleSearchClick}
          className="bg-primary rounded-full flex justify-center items-center text-white px-4"
        >
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg"
            width={30}
            height={40}
            alt="Search"
          />
          Search
        </Link>
      </div>
      {query && (
        <div className="absolute w-full text-[16px] z-20 top-20 sm:w-[510px] bg-white border border-stroke shadow-lg rounded-lg">
          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Lodges
            </h3>
            {results.lodges.length > 0 ? (
              results.lodges.map((lodge) => (
                <Link
                  key={lodge.id}
                  href={`/lodges/lodge_details/${lodge.id}`}
                  className="flex items-center gap-2 py-[7px]  px-4"
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_9_qyn75o.svg"
                    alt={lodge.name}
                  />
                  <p>{lodge.name}</p>
                </Link>
              ))
            ) : (
              <p>No similar lodges found.</p>
            )}
          </div>
          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Cities
            </h3>
            {results.cities.length > 0 ? (
              results.cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/lodges/lodge_details/${city.id}`}
                  className="flex items-center gap-2 py-[7px]  px-4"
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg"
                    alt={city.address}
                  />
                  <p>{city.address}</p>
                </Link>
              ))
            ) : (
              <p>No similar cities found.</p>
            )}
          </div>
          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Schools
            </h3>
            {results.schools.length > 0 ? (
              results.schools.map((school) => (
                <Link
                  key={school.id}
                  href={`/lodges/lodge_details/${school.id}`}
                  className="flex items-center gap-2 py-[7px]  px-4"
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Group_r16ctp.svg"
                    alt={school.university}
                  />
                  <p>{school.university}</p>
                </Link>
              ))
            ) : (
              <p>No similar schools found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
