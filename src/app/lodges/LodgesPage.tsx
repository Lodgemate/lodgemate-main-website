/**
 * Functional component for the Lodges page.
 * This component renders the HeroSection, SearchBar, and BrowseLodges components.
 * It also initializes AOS library for animations and manages the search state.
 * @returns JSX element representing the Lodges page.
 */
"use client"

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseLodges from "./BrowseLodges";
import AOS from "aos";


function LodgesPage() {
  const [isSearchTriggered, setIsSearchTriggered] = useState<boolean>(false);

  const handleSearch = () => {
    setIsSearchTriggered(true);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
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

      <BrowseLodges isSearchTriggered={isSearchTriggered} />
    </div>
  );
}

export default LodgesPage;
