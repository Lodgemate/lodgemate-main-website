import React from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseLodges from "./BrowseLodges";

function LodgesPage() {
  return (
    <div>
      <HeroSection />
      <div className="px-4">
        <SearchBar />
      </div>
      <BrowseLodges />

      <div>
        
      </div>
    </div>
  );
}

export default LodgesPage;
