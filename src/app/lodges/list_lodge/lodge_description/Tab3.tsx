"user client";

import React, { useState } from "react";

interface Box {
  id: number;
  imgSrc: string;
  text: string;
}

const Tab3Content: React.FC = () => {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

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

  const handleBoxClick = (id: number) => {
    setSelectedBox(id);
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-wrap  gap-5 mt-5">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={` rounded-[8px] p-[20px] border flex gap-2 items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBox === box.id ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => handleBoxClick(box.id)}
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
