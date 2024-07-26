"use client";

import React, { useState } from "react";
import Tab1Content from "./Tab1";
import Tab2Content from "./Tab2";

const LodgeDescription = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    
    { title: "Tab 1", content: <Tab1 /> },
    { title: "Tab 2", content: <Tab2 /> },
  ];

  const nextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="flex w-full px-4 sm:px-[150px] min-h-screen mb-[50px] ">
      <div className="flex w-full flex-col">
        <div className=" mt-[100px] justify-center flex items-center w-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button h-0 w-[42px] mx-2 rounded-full ${
                activeTab === index ? "bg-primary" : "bg-xgray"
              }`}
              onClick={() => setActiveTab(index)}
            ></button>
          ))}
        </div>
        <button
          onClick={prevTab}
          disabled={activeTab === 0}
          className="mt-[40px] mb-[20px] w-fit"
        >
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102154/utilities/LodgeMate_File/lucide_move-up_zjmfel.svg"
            alt=""
          />
        </button>
        <div className="tab-content mb-[100px]">{tabs[activeTab].content}</div>
        <div className="flex justify-between sm:justify-center items-center">
          <button
            onClick={prevTab}
            disabled={activeTab === 0}
            className="sm:hidden flex items-center gap-2  "
          >
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102154/utilities/LodgeMate_File/lucide_move-up_zjmfel.svg"
              alt="back"
            />
            Back
          </button>
          <button
            onClick={nextTab}
            disabled={activeTab === tabs.length - 1}
            className="bg-primary text-white w-1/2 sm:w-[300px] h-[48px] rounded-[8px]"
          >
            {activeTab === 1 ? "List your lodge" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};



const Tab1 = () => (
  <div>
    <h2 className=" text-[24px] text-lblack">
      Upload quality images of your service. <br /> A minimum of (5) images is
      required.
    </h2>
    <form>
      <Tab1Content />
    </form>
  </div>
);

const Tab2 = () => (
  <div>
    <h2 className=" text-[24px] text-lblack">
      Almost done. Fill in these details.
    </h2>
    <form>
      <Tab2Content />
    </form>
  </div>
);

export default LodgeDescription;
