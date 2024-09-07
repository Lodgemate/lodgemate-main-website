/**
 * Functional component for the Lodges page.
 * This component renders the HeroSection, SearchBar, and BrowseLodges components.
 * It also initializes AOS library for animations and manages the search state.
 * @returns JSX element representing the Lodges page.
 */
"use client"

import React, { Suspense, useState } from "react";
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
    <div data-aos="zoom-in-up">
      <div>
        <HeroSection />
        <div className="px-4 ">
        <Suspense fallback=''>
        <SearchBar onSearch={handleSearch} />
        </Suspense>

        </div>
      </div>

      <div className="">
        <BrowseLodges isSearchTriggered={isSearchTriggered} />
      </div>
    </div>
  );
}

export default LodgesPage;
