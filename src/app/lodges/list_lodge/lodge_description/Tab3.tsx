"user client";

import {
  appendStateItem,
  selectAllList_Listingdata,
  setStateItem,
} from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React, { useState } from "react";

interface Box {
  id: number;
  imgSrc: string;
  imgSrc2: string;
  text: string;
}

const Tab3Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllList_Listingdata);
  const hasKey = data.has("lodgeFeatures[]");
  console.log(hasKey);
  const extractedData: any = (hasKey && data.getAll("lodgeFeatures[]")) || null;
  console.log(extractedData);
  const [selectedBox, setSelectedBox] = useState<any>(
    (extractedData && extractedData) || []
  );
  console.log(selectedBox);
  const boxes: Box[] = [
    {
      id: 1,
      imgSrc: "/icons/water.svg",
      imgSrc2: "/icons/water_white.svg",
      text: "Water",
    },
    {
      id: 2,
      imgSrc: "/icons/hot_water.svg",
      imgSrc2: "/icons/hot_water_white.svg",
      text: "Water heater",
    },
    {
      id: 3,
      imgSrc: "/icons/wifi.svg",
      imgSrc2: "/icons/wifi_white.svg",
      text: "Wifi",
    },
    {
      id: 4,
      imgSrc: "/icons/45d_arrow.svg",
      imgSrc2: "/icons/45d_arrow_white.svg",
      text: "Proximity to school",
    },
    {
      id: 5,
      imgSrc: "/icons/electric.svg",
      imgSrc2: "/icons/electric_white.svg",
      text: "Electricity",
    },
    {
      id: 6,
      imgSrc: "/icons/safe.svg",
      imgSrc2: "/icons/safe_white.svg",
      text: "Security",
    },
    {
      id: 7,
      imgSrc: "/icons/car1.svg",
      imgSrc2: "/icons/car1_white.svg",
      text: "Parking space",
    },
    {
      id: 8,
      imgSrc: "/icons/ball1.svg",
      imgSrc2: "/icons/ball1_white.svg",
      text: "Recreation center",
    },
    {
      id: 9,
      imgSrc: "/icons/shop1.svg",
      imgSrc2: "/icons/shop1_white.svg",
      text: "Provision shop",
    },
  ];

  const handleBoxClick = (text: string) => {
    if (selectedBox.includes(text)) {
      let updatedArr = selectedBox.filter((ent: string) => ent != text);
      setSelectedBox(updatedArr);
      data.delete("lodgeFeatures[]");
      updatedArr.forEach((element: string) => {
        dispatch(appendStateItem({ key: "lodgeFeatures[]", value: element }));
      });
    } else {
      let updatedArr = [...selectedBox, text];
      setSelectedBox(updatedArr);
      dispatch(appendStateItem({ key: "lodgeFeatures[]", value: text }));
    }
  };

  return (
    <div className="flex flex-col items-center text-[14px]">
      <form className="flex flex-wrap justify-center items-center gap-5 mt-5">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={` rounded-[8px] p-[20px] border flex gap-2 items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBox.includes(box.text.toLowerCase())
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            onClick={() => handleBoxClick(box.text.toLowerCase())}
          >
            <Image
              src={
                selectedBox.includes(box.text.toLowerCase())
                  ? box.imgSrc2
                  : box.imgSrc
              }
              alt={box.text}
              width={100}
              height={100}
              className="w-6 h-6"
            />
            <p
              className={`${
                selectedBox.includes(box.text.toLowerCase())
                  ? "text-white"
                  : "text-stone-800"
              }`}
            >
              {box.text}
            </p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Tab3Content;
