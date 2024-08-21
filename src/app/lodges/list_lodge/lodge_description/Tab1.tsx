"user client";

import {
  selectAllList_Listingdata,
  setStateItem,
} from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

interface Box {
  id: number;
  imgSrc: string;
  imgSrc2: string;
  text: string;
}

const Tab1Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllList_Listingdata);
  const hasKey = data.has("type");
  const extractedData = (hasKey && data.getAll("type")) || null;
  const [selectedBox, setSelectedBox] = useState<any>(
    (extractedData && extractedData[0]) || "null"
  );
  const boxes: Box[] = [
    {
      id: 1,
      imgSrc: "/icons/building1.svg",
      imgSrc2: "/icons/building1_white.svg",
      text: "apartment",
    },
    {
      id: 2,
      imgSrc: "/icons/building2.svg",
      imgSrc2: "/icons/building2_white.svg",
      text: "self-contained",
    },
    {
      id: 3,
      imgSrc: "/icons/building2.svg",
      imgSrc2: "/icons/building2_white.svg",
      text: "flat",
    },
    {
      id: 4,
      imgSrc: "/icons/house1.svg",
      imgSrc2: "/icons/house1_white.svg",
      text: "single-room",
    },
  ];

  const handleBoxClick = (text: string) => {
    setSelectedBox(text);
    dispatch(setStateItem({ key: "type", value: text }));
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-wrap justify-center gap-5 mt-5">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`w-[300px] rounded-[8px] h-[122px] border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBox === box.text ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => handleBoxClick(box.text)}
          >
            <img
              src={selectedBox === box.text ? box.imgSrc2 : box.imgSrc}
              alt={box.text}
              className="w-[28px] h-[28px]"
            />
            <p className="mt-2">{box.text}</p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default React.memo(Tab1Content);