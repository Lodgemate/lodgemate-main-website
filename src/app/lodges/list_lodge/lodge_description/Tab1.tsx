"user client";

import {
  selectAllList_Lodgesdata,
  setStateItem,
} from "@/lib/features/List_Lodges/List_LogdesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

interface Box {
  id: number;
  imgSrc: string;
  text: string;
}

const Tab1Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllList_Lodgesdata);
  const hasKey = data.has("type");
  const extractedData = (hasKey && data.getAll("type")) || null;
  const [selectedBox, setSelectedBox] = useState<any>(
    (extractedData && extractedData[0]) || "null"
  );
  const boxes: Box[] = [
    {
      id: 1,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719880287/utilities/LodgeMate_File/fluent_building-multiple-20-regular_mbdur2.svg",
      text: "apartment",
    },
    {
      id: 2,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718408373/utilities/LodgeMate_File/covid_quarantine-place-self-lockdown-2_s4rvvo.svg",
      text: "self-contained",
    },
    {
      id: 3,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718408373/utilities/LodgeMate_File/covid_quarantine-place-self-lockdown-2_s4rvvo.svg",
      text: "flat",
    },
    {
      id: 4,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337642/utilities/LodgeMate_File/House_1_fpt0yj.svg",
      text: "single-room",
    },
  ];

  const handleBoxClick = (text: string) => {
    setSelectedBox(text);
    dispatch(setStateItem({ key: "type", value: text }));
  };

  return (
    <div className='flex flex-col items-center'>
      <form className='flex flex-wrap justify-center gap-5 mt-5'>
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`w-[300px] rounded-[8px] h-[122px] border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBox === box.text ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => handleBoxClick(box.text)}
          >
            <img
              src={box.imgSrc}
              alt={box.text}
              className='w-[28px] h-[28px]'
            />
            <p className='mt-2'>{box.text}</p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default React.memo(Tab1Content);