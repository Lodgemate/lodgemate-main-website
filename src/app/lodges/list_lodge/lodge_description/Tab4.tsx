"use client";

import { imagesSetStateItem, selectAllList_imagesUrl, selectAllList_Listingdata, setImagesUrl } from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";

const Tab4Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data =useAppSelector(selectAllList_imagesUrl)
  const images =data;
  const [placeholders, setPlaceholders] = useState<number[]>([1, 2, 3, 4, 5]);
  console.log(images)
  console.log(typeof images[0])
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      const newImage = URL.createObjectURL(event.target.files[0]);
      const newImages = [...images];
      newImages[index] = newImage;
      dispatch(setImagesUrl(newImages))
      dispatch(imagesSetStateItem({key: 'photos', value:event.target.files[0], index: index}))
    }
  };

  const addPlaceholder = () => {
    setPlaceholders([...placeholders, placeholders.length + 1]);
  };

  useEffect(()=>{

  },[])

  return (
    <div className="flex flex-col items-center mt-[20px] text-[14px]">
      <form className="flex flex-wrap max-w-[500px] justify-center sm:gap-5 gap-2 mt-5">
        {placeholders.map((placeholder, index) => (
          <div
            key={index}
            className={`${
              index === 0
                ? "sm:w-[500px] w-full h-[300px]"
                : "sm:w-[240px] w-[160px] h-[100px] overflow-hidden"
            }  flex items-center justify-center`}
          >
            <label
              className="flex items-center justify-center w-full h-full cursor-pointer"
              htmlFor={`file-input-${index}`}
            >
              <input
                id={`file-input-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                className="hidden"
              />
              {images[index] ? (
                <img
                  src={images[index]}
                  alt={`Uploaded ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719883622/utilities/LodgeMate_File/Upload_imagesdfghj_vlbzk7.svg"
                  alt=""
                  className="w-full"
                />
              )}
            </label>
          </div>
        ))}
      </form>
      <button
        type="button"
        onClick={addPlaceholder}
        className="mt-3 p-2 bg-white text-black border rounded-[8px] justify-center flex items-end"
      >
        + Add More
      </button>
    </div>
  );
};

export default Tab4Content;
