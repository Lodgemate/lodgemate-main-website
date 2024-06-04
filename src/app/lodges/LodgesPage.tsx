"use client"

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseLodges from "./BrowseLodges";

function LodgesPage() {
  const [query, setQuery] = useState<string>("");
  const [isSearchTriggered, setIsSearchTriggered] = useState<boolean>(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearchTriggered(true);
  };

  return (
    <div>
      <HeroSection />
      <div className="px-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <BrowseLodges query={query} isSearchTriggered={isSearchTriggered} />
    </div>
  );
}

export default LodgesPage;
