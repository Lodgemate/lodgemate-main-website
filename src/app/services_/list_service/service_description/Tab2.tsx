"use client";

import React from "react";

const Tab2Content: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-dgray">
      <form className="w-full max-w-lg flex flex-col gap-4 mt-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="lodgeName">Enter a name for your service</label>
          <input
            type="text"
            id="lodgeName"
            placeholder="e.g. electrical rewiring service in kumasa"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lodgeName">Select a category for your service</label>
          <input
            type="text"
            id="lodgeName"
            placeholder="e.g. electrical services,"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lodgeLocation">Select location you deliver to</label>
          <input
            type="text"
            id="lodgeLocation"
            placeholder="e.g. Okigwe, aba-owerri road"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="price">Set a price for your service</label>
          <input
            type="number"
            id="price"
            placeholder="e.g. ₦10,000, ₦8,000 - ₦9,000"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center text-[15px]">
          <input type="checkbox" id="negotiable" className="mr-2" />
          <label htmlFor="negotiable">
            Let people contact for price instead
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Describe your service</label>
          <textarea
            id="description"
            placeholder="Write a short description about your service"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
      </form>
    </div>
  );
};

export default Tab2Content;
