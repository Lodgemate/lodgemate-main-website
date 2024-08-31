"use client"

import React, { useState } from "react";
import Lodges from "./Lodges";
import Roommates from "./Roommates";
import Services from "./Services";
import TourCart from "./TourCart";

interface TabData {
  message: string;
  content: JSX.Element;
}

function Wishlist() {
  const [activeTab, setActiveTab] = useState<string>("Lodges");

  const tabData: { [key: string]: TabData } = {
    Lodges: {
      message: "You have 7 lodges in your wishlist",
      content: (
        <div>
          <Lodges />
        </div>
      ),
    },
    Roommates: {
      message: "You have 5 roomies in your wishlist",
      content: <div><Roommates /></div>,
    },
    Serivices: {
      message: "You have 3 services in your wishlist",
      content: (
        <div>
          <Services />
        </div>
      ),
    },
    "Tour cart": {
      message: "You saved 3 lodges for tour/visiting",
      content: <div><TourCart /></div>,
    },
  };

  return (
    <div className="p-4 mt-[100px] min-h-screen sm:px-[100px] text-[14px] text-lblack ">
      <h1 className="text-[14px] pb-4 sm:hidden block">
        {tabData[activeTab].message}
      </h1>

      <div className="flex justify-between items-center">
        <h1 className="text-[16px] sm:block hidden">
          {tabData[activeTab].message}
        </h1>
        <div className="flex  bg-[#F8F8F8] p-1 rounded overflow-x-auto  no-scrollbar">
          <div className="flex items-center min-w-[400px]">
            {Object.keys(tabData).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab ? "bg-primary text-white" : " text-lblack"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">{tabData[activeTab].content}</div>
    </div>
  );
}

export default Wishlist;
