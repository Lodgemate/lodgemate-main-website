"use client"

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseLodges from "./BrowseLodges";
import AOS from "aos";


function LodgesPage() {
  const [query, setQuery] = useState<string>("");
  const [isSearchTriggered, setIsSearchTriggered] = useState<boolean>(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearchTriggered(true);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  });

  return (
    <div>
      <div data-aos="zoom-in-up">
        <HeroSection />
        <div className="px-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <BrowseLodges query={query} isSearchTriggered={isSearchTriggered} />
    </div>
  );
}

export default LodgesPage;
