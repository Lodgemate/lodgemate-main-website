"use client";

import React, { useState } from "react";
import UserDetailas from "./UserDetaile";
import LodgeListed from "./LodgesListed";
import ServicesListed from "./ServicesList";

const MyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Lodges listed (13)");

  return (
    <div className=" min-h-[1000px] p-">
      <div className="w-full h-[270px] hidden sm:block border-b bg-[#F9F9F9]"></div>
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:-mt-[55px]  sm:px-[80px]  gap-4 sm:gap-4">
        {/* User Detail Column */}
        <div className="col-span-1">
          <div className="sm:relative p-4 bg- rounded border- bg-[CCCCCC]">
            <p className="hidden sm:flex">user</p>
            <div className="flex w-full sm:absolute -top-10">
              <UserDetailas />
            </div>
          </div>
        </div>
        {/* Tab Header and Content Column */}
        <div className="sm:col-span-3">
          <div className="py-4 bg- rounded ">
            <div className="flex sm:space-x-4 space-x-2 sm:border-b-0 overflow-x-auto whitespace-nowrap">
              {[
                "Lodges listed (13)",
                "Services listed (4)",
                "Ratings & reviews (27)",
              ].map((tab) => (
                <div
                  key={tab}
                  className={`cursor-pointer p-2 ${
                    activeTab === tab ? "border-b-primary border-b-4 text-primary" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="mt-4">
              {activeTab === "Lodges listed (13)" && (
                <div>
                  <LodgeListed />
                </div>
              )}
              {activeTab === "Services listed (4)" && (
                <div>
                  <ServicesListed />
                </div>
              )}
              {activeTab === "Ratings & reviews (27)" && (
                <div>Ratings & reviews content</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
