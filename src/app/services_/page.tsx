"use client";

import React, { Suspense, useState } from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseServices from "./BrowseServices";
import AOS from "aos";

function Services() {
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
        <div className="px-4">
        <Suspense fallback=''>
        <SearchBar onSearch={handleSearch} />
        </Suspense>
        </div>
      </div>

      <BrowseServices isSearchTriggered={isSearchTriggered} />
    </div>
  );
}

export default Services;
