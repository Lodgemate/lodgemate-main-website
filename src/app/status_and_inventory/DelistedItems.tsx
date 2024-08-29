"use client";

import React, { useState } from "react";
import Lodges from "./delisted/Lodges";
import Roommates from "./requests/Roommates";
import Services from "./delisted/Services";

interface TabData {
  name: string;
  message: string;
  content: JSX.Element;
}

function DelistedItems() {
  const [activeTab, setActiveTab] = useState<string>("Lodges");

  const tabData: { [key: string]: TabData } = {
    Lodges: {
      name: "Lodges",
      message: "You have 7 lodges in your wishlist",
      content: (
        <div>
          <Lodges />
        </div>
      ),
    },
    Serivices: {
      name: "Services",
      message: "You have 5 roomies in your wishlist",
      content: (
        <div>
          <Services />
        </div>
      ),
    },
   
  };

  return (
    <div className="p-4 min-h-screen text-lblack ">
      <div className="flex  items-center">
        <div className="flex  bg-[#F8F8F8 p-1 rounded-[8px]">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded font-semibold ${
                activeTab === tab
                  ? "text-primary bg-white border-b-2 border-primary"
                  : " text-lblack"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tabData[tab].name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">{tabData[activeTab].content}</div>
    </div>
  );
}

export default DelistedItems;
