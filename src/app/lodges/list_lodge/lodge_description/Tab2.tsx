"user client";

import {
  selectAllList_Listingdata,
  setStateItem,
} from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { GoHome } from "react-icons/go";
import React, { useState } from "react";

interface Box {
  id: number;
  text: string;
}

const Tab2Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllList_Listingdata);
  const hasKey = data.has("numberOfRooms");
  const extractedData = (hasKey && data.get("numberOfRooms")) || null;
  const [selectedBox, setSelectedBox] = useState<any>(
    (extractedData && Number(extractedData)) || null
  );

  const boxes: Box[] = [
    {
      id: 1,
      text: "1 room",
    },
    {
      id: 2,
      text: "2 rooms",
    },
    {
      id: 3,
      text: "3 rooms",
    },
    {
      id: 4,
      text: "4 rooms",
    },
    {
      id: 5,
      text: "5 rooms",
    },
    {
      id: 6,
      text: "6 rooms",
    },
    {
      id: 7,
      text: "7 rooms",
    },
    {
      id: 8,
      text: "8 rooms",
    },
    {
      id: 9,
      text: "9 rooms",
    },
    {
      id: 10,
      text: "10+ rooms",
    },
  ];

  const handleBoxClick = (text: number) => {
    setSelectedBox(text);
    dispatch(setStateItem({ key: "numberOfRooms", value: text }));
  };

  return (
    <div className="flex flex-col items-center text-[14px]">
      <form className="flex flex-wrap justify-center gap-5 mt-5">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`w-[150px] rounded-[8px] h-[88px] border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBox === box.id ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => handleBoxClick(box.id)}
          >
            <GoHome
              className={`h-6 w-6 ${
                selectedBox === box.id ? "text-white" : "text-zinc-700"
              }`}
            />
            <p className="mt-2">{box.text}</p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Tab2Content;
