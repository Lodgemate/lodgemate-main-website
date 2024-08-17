"user client";

import { appendStateItem, selectAllList_Listingdata, setStateItem } from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

interface Box {
  id: number;
  imgSrc: string;
  imgSrc2: string;
  text: string;
}

const Tab3Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data =useAppSelector(selectAllList_Listingdata)
  const hasKey = data.has('lodgeFeatures[]');
  console.log(hasKey); 
  const extractedData: any = hasKey && data.getAll('lodgeFeatures[]') || null
    console.log(extractedData)
  const [selectedBox, setSelectedBox] = useState<any>(extractedData && extractedData ||[]);
  console.log(selectedBox)
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
    // if (selectedBox.includes(text)) {
    //   let updatedArr = selectedBox.filter((ent: string) => ent != text);
    //   console.log(updatedArr)
    //   setSelectedBox(updatedArr);
    //   dispatch(setStateItem({ key: "lodgeFeatures", value: JSON.stringify(updatedArr) }));
    // } else {
    //   let updatedArr = [...selectedBox, text];
    //   console.log(updatedArr)

    //   setSelectedBox(updatedArr);
    //   dispatch(setStateItem({ key: "lodgeFeatures", value: JSON.stringify(updatedArr) }));
    // }
    if (selectedBox.includes(text)) {
      
      let updatedArr = selectedBox.filter((ent: string) => ent != text);
      setSelectedBox(updatedArr);
      data.delete("lodgeFeatures[]")
      updatedArr.forEach((element: string) => {
      dispatch(appendStateItem({ key: "lodgeFeatures[]", value: element }));
        
      });
    }else{
       let updatedArr = [...selectedBox, text];
       setSelectedBox(updatedArr);
      dispatch(appendStateItem({ key: "lodgeFeatures[]", value: text }));

      // let updatedArr = [...selectedBox, text];
      // setSelectedBox(updatedArr);
      // updatedArr.forEach((element: string) => {
      //   dispatch(appendStateItem({ key: "lodgeFeatures[]", value: element }));
      //   });
    }
    
    }

  // make an array
  // in the function create a shallow arr"
  // use the shallow arrar to dispatch to store 
  // correct reducer logic
  // from there use store to revalidate component

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-wrap  gap-5 mt-5">
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
            <img
              src={
                selectedBox.includes(box.text.toLowerCase())
                  ? box.imgSrc2
                  : box.imgSrc
              }
              alt={box.text}
              className="w-[18px] h-[18px]"
            />
            <p className="mt-2">{box.text}</p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Tab3Content;
