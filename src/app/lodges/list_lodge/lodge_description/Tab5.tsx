"use client";

import React, { useState } from "react";

const Tab4Content: React.FC = () => {
  

 

  return (
    <div className="flex flex-col items-center text-dgray">
      <form className="w-full max-w-lg flex flex-col gap-4 mt-5">
        <input
          type="text"
          placeholder="Enter name of lodge"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Enter location of lodge"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex items-center text-[15px]">
          <input type="checkbox" id="negotiable" className="mr-2" />
          <label htmlFor="negotiable">Mark price as negotiable</label>
        </div>
        <textarea
          placeholder="Write a short description about your lodge"
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </form>
      
      
    </div>
  );
};

export default Tab4Content;
