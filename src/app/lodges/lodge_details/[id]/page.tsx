"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useParams } from "next/navigation";
import LodgeInfo from "./LodgeInfo";

const LodgeDetailPage: React.FC = () => {
  const params = useParams();
  const { id } = params || {};

  // Parse the id and set it as a state variable
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      setCurrentProductId(parseInt(id, 10));
    }
  }, [id]);

  return (
    <div className="mt-[120px] text-[16px]">
      <SearchBar />
      {currentProductId !== null ? (
        <LodgeInfo id={currentProductId} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LodgeDetailPage;
