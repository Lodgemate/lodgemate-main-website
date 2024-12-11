"use client";

import {
  imagesSetStateItem,
  selectAllList_imagesUrl,
  setImagesUrl,
} from "@/lib/features/Listing/ListingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CiImageOn } from "react-icons/ci";
import React, { useEffect, useState } from "react";

const Tab4Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllList_imagesUrl);
  const images = data || [];
  const [placeholders, setPlaceholders] = useState<number[]>([1, 2, 3, 4, 5]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files); // Convert FileList to an array
      const newImages = [...images];

      filesArray.forEach((file, idx) => {
        const imageUrl = URL.createObjectURL(file);
        newImages[index + idx] = imageUrl; // Add images at the respective indices
        dispatch(
          imagesSetStateItem({ key: "photos", value: file, index: index + idx })
        );
      });

      dispatch(setImagesUrl(newImages));
    }
  };

  const addPlaceholder = () => {
    setPlaceholders([...placeholders, placeholders.length + 1]);
  };

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
                multiple
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
                <div className="border-dotted border-[1.9px] flex flex-col items-center justify-center gap-2 text-stone-800 h-full w-full rounded-lg border-stone-400">
                  <CiImageOn className="h-8 w-8" />
                  <p>Click to upload</p>
                </div>
              )}
            </label>
          </div>
        ))}
      </form>
      <button
        type="button"
        onClick={addPlaceholder}
        className="mt-3 p-2 bg-white  border rounded-[8px] justify-center flex items-end"
      >
        + Add More
      </button>
    </div>
  );
};

export default Tab4Content;
