"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import roommates from "./data";
import Card from "./Card"; // Import Card component

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
  onCitySelect: (city: string) => void; // New prop for city selection
  onSchoolSelect: (school: string) => void; // New prop for school selection
}

interface Product {
  id: number;
  type: string;
  name: string;
  address: string;
  university: string;
}

interface SearchResult {
  cities: { id: number; address: string }[];
  schools: { id: number; university: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onCitySelect,
  onSchoolSelect,
}) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult>({
    cities: [],
    schools: [],
  });
  const [showResults, setShowResults] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query) {
      const filteredResults = filterResults(query);
      setResults(filteredResults);
      setShowResults(true);
    } else {
      setResults({ cities: [], schools: [] });
      setShowResults(false);
    }
  }, [query]);

  const filterResults = (query: string): SearchResult => {
    const lowercaseQuery = query.toLowerCase();
    const cities: { id: number; address: string }[] = [];
    const schools: { id: number; university: string }[] = [];

    roommates.forEach((roommate: Product) => {
      if (roommate.type === "roommate") {
        if (
          roommate.address.toLowerCase().includes(lowercaseQuery) &&
          cities.length < 3
        ) {
          const addressParts = roommate.address.split(",");
          if (addressParts.length > 1 && addressParts[1]) {
            cities.push({
              id: roommate.id,
              address: addressParts[1].trim(),
            });
          }
        }
        if (
          roommate.university.toLowerCase().includes(lowercaseQuery) &&
          schools.length < 3
        ) {
          schools.push({ id: roommate.id, university: roommate.university });
        }
      }
    });

    return { cities, schools };
  };

  const handleSearchClick = () => {
    onSearch(query);
    setQuery("");
  };

  const handleCityClick = (city: string) => {
    onCitySelect(city); // Pass selected city to parent component
    setShowResults(false); // Hide results after city selection
  };

  const handleSchoolClick = (school: string) => {
    onSchoolSelect(school); // Pass selected school to parent component
    setShowResults(false); // Hide results after school selection
  };

  return (
    <div className="flex relative justify-center w-full items-center mt-[20px]">
      <div
        className="border-2 pl-[24px] p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[16px] h-[63px] shadow-lg"
        ref={searchRef}
      >
        <input
          type="text"
          placeholder="Where do you want to live...?"
          className="rounded-full sm:w-[300px] w-[250px]- w-full  bg-white outline-none mr-2"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        <button
          className="bg-primary rounded-full flex justify-center items-center text-white px-6"
          onClick={handleSearchClick}
        >
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg"
            width={30}
            height={40}
            alt=""
          />
          Search
        </button>
      </div>

      {showResults && (
        <div className="absolute w-full text-[16px] z-20 top-[80px] sm:w-[510px] bg-white border border-stroke shadow-lg rounded-lg">
          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Cities
            </h3>
            {results.cities.length > 0 ? (
              results.cities.map((city) => (
                <div
                  key={city.id}
                  className="flex items-center gap-2 py-[7px]  px-4"
                  onClick={() => handleCityClick(city.address)}
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Vector_10_z9suod.svg"
                    alt={city.address}
                  />
                  <p>{city.address} </p>
                </div>
              ))
            ) : (
              <p className="px-4">No similar cities found.</p>
            )}
          </div>
          <div>
            <h3 className="bg-[#F5F5F5] py-[7px] px-4 text-dgray font-bold">
              Schools
            </h3>
            {results.schools.length > 0 ? (
              results.schools.map((school) => (
                <div
                  key={school.id}
                  className="flex items-center gap-2 py-[7px]  px-4"
                  onClick={() => handleSchoolClick(school.university)}
                >
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717527777/utilities/webspirre/Group_r16ctp.svg"
                    alt={school.university}
                  />
                  <p>{school.university}</p>
                </div>
              ))
            ) : (
              <p className="px-4">No similar schools found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
