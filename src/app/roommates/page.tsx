"use client";

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import BrowseRoomates from "./BrowseRoomates";
import AOS from "aos";


function Roommates() {
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
          <SearchBar />{" "}
        </div>
      </div>

      <BrowseRoomates />
    </div>
  );
}

export default Roommates;
