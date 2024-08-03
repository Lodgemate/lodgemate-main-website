"use client";

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseRoomates from "./BrowseRoomates";
import ProfileDetails from "./roomate_details/ProfileDetails";
import AOS from "aos";

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

   React.useEffect(() => {
     AOS.init({
       duration: 1000,
     });
   });
  return (
    <div>
      <HeroSection />
      <div className="px-4">
        <SearchBar />{" "}
      </div>
      <BrowseRoomates
      />
    </div>
  );
}

export default Roommates;
