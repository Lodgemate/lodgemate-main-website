"user client";

import { appendStateItem, selectAllList_Lodgesdata, setStateItem } from "@/lib/features/List_Lodges/List_LogdesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

interface Box {
  id: number;
  imgSrc: string;
  text: string;
}

const Tab3Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data =useAppSelector(selectAllList_Lodgesdata)
  const hasKey = data.has('lodgeFeatures');
  console.log(hasKey); 
  const extractedData: any = hasKey && data.get('lodgeFeatures') || null
  const parsedData = JSON.parse(extractedData)
    console.log(JSON.parse(extractedData))
    console.log(data)
  const [selectedBox, setSelectedBox] = useState<any>(parsedData && parsedData ||[]);
  console.log(selectedBox)
  const boxes: Box[] = [
    {
      id: 1,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201088/utilities/LodgeMate_File/Vector_1_njk9ml.svg",
      text: "Water",
    },
    {
      id: 2,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201087/utilities/LodgeMate_File/Vector_2_iqvt3t.svg",
      text: "Water heater",
    },
    {
      id: 3,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_6_vamzbw.svg",
      text: "Wifi",
    },
    {
      id: 4,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201232/utilities/LodgeMate_File/pro_iztpun.svg",
      text: "Proximity to school",
    },
    {
      id: 5,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201521/utilities/LodgeMate_File/Vector_8_tz6xyw.svg",
      text: "Electricity",
    },
    {
      id: 6,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_7_rcxtti.svg",
      text: "Security",
    },
    {
      id: 7,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_5_ppfwpx.svg",
      text: "Parking space",
    },
    {
      id: 8,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201087/utilities/LodgeMate_File/Vector_4_kjhg0c.svg",
      text: "Recreation center",
    },
    {
      id: 9,
      imgSrc:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1717201086/utilities/LodgeMate_File/Vector_3_uyvtoc.svg",
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

    let updatedArr = [...selectedBox, text];
    console.log(updatedArr)

    setSelectedBox(updatedArr);
    dispatch(setStateItem({ key: "lodgeFeatures", value: JSON.stringify(updatedArr) }));

    updatedArr.forEach((feature, index) => {
      formData.append(`lodgeFeatures[]`, feature);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-wrap  gap-5 mt-5">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={` rounded-[8px] p-[20px] border flex gap-2 items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBox.includes(box.text) ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => handleBoxClick(box.text)}
          >
            <img
              src={box.imgSrc}
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
