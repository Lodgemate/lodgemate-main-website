"use client";

import React, { useState } from "react";

const Tab1Content: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [placeholders, setPlaceholders] = useState<number[]>([1, 2, 3, 4, 5]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      const newImages = [...images];
      newImages[index] = newImage;
      setImages(newImages);
    }
  };

  const addPlaceholder = () => {
    setPlaceholders([...placeholders, placeholders.length + 1]);
  };

  return (
    <div className="flex flex-col items-center mt-[20px]">
      <form className="flex flex-wrap max-w-[500px] gap-5 mt-5">
        {placeholders.map((placeholder, index) => (
          <div
            key={index}
            className={`${
              index === 0
                ? "w-[500px] h-[300px]"
                : "w-[240px] h-[160px] overflow-hidden"
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

export default Tab1Content;
