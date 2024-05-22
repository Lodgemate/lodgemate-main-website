import React from 'react';
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseServices from "./BrowseServices";

function Services() {
  return (
    <div>
      <HeroSection />
      <div className="px-4">
        <SearchBar />
      </div>
      <BrowseServices />
    </div>
  );
}

export default Services
