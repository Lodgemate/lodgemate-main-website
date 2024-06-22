"use client";

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseRoomates from "./BrowseRoomates";
import ProfileDetails from "./roomate_details/ProfileDetails";

function Roommates() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchTriggered, setIsSearchTriggered] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCity(null);
    setSelectedSchool(null);
    setIsSearchTriggered(true);
  };

  
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchQuery("");
    setIsSearchTriggered(false);
  };

  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    setSearchQuery("");
    setIsSearchTriggered(false);
  };

  return (
    <div>
      <HeroSection />
      <div className="px-4">
        <SearchBar
          onSearch={handleSearch}
          onCitySelect={handleCitySelect}
          onSchoolSelect={handleSchoolSelect}
        />{" "}
      </div>
      <BrowseRoomates
        selectedCity={selectedCity}
        selectedSchool={selectedSchool}
        query={searchQuery}
        isSearchTriggered={isSearchTriggered}
      />
    </div>
  );
}

export default Roommates;
