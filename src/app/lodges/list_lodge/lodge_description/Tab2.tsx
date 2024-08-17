"user client";

import { selectAllList_Listingdata, setStateItem } from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

interface Box {
  id: number;
  text: string;
}

const Tab2Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data =useAppSelector(selectAllList_Listingdata)
  const hasKey = data.has('numberOfRooms');
  console.log(hasKey); 
  const extractedData = hasKey && data.get('numberOfRooms') || null
    console.log(extractedData)
    console.log(data)
  console.log(data)
  const [selectedBox, setSelectedBox] = useState<any>(extractedData && Number(extractedData) || null);

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
    dispatch(setStateItem({ key: 'numberOfRooms', value: text }))
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-wrap justify-cente gap-5 mt-5">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`w-[150px] rounded-[8px] h-[88px] border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBox === box.id ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => handleBoxClick(box.id)}
          >
            <img
              src={
                selectedBox === box.id
                  ? "/icons/house1_white.svg"
                  : "/icons/house1.svg"
              }
              alt=""
              className="w-[28px] h-[28px]"
            />
            <p className="mt-2">{box.text}</p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Tab2Content;
