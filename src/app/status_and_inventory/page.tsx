"use client";

import React, { useState } from "react";
import DelistedItems from "./DelistedItems";
import YourRequest from "./YourRequest";

interface TabData {
  message: string;
  name: string;
  content: JSX.Element;
}

function StatusAndInventory() {
  const [activeTab, setActiveTab] = useState<string>("YourRequest");

    const tabData: { [key: string]: TabData } = {
      YourRequest: {
        name: "Your requests",
        message: "Your requests",
        content: (
          <div>
            <YourRequest />
          </div>
        ),
      },
      DelistedItems: {
        name: "Delisted items",
        message: "Delisted items",
        content: (
          <div>
            <DelistedItems />
          </div>
        ),
      },
    };

  return (
    <div className="p-4 mt-[100px] min-h-screen sm:px-[100px] text-lblack ">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px]">{tabData[activeTab].message}</h1>
        <div className="flex  bg-[#F8F8F8] p-1 rounded-[8px]">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? "bg-primary text-white" : " text-lblack"
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

export default StatusAndInventory;
