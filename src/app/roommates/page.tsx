import React from 'react'
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseRoomates from "./BrowseRoomates";

function Roommates() {
  return (
    <div>
      <HeroSection />
      <div className="px-4">
        <SearchBar />
      </div>
      <BrowseRoomates />
    </div>
  );
}

export default Roommates
