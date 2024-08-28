"use client";

import React from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseServices from "./BrowseServices";
import AOS from "aos";

function Services() {
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
          <SearchBar />
        </div>
      </div>

      <BrowseServices />
    </div>
  );
}

export default Services;
