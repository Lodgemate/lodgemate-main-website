import Image from 'next/image';
import React from 'react'

function SearchBar() {
  return (
    <div className="flex justify-center w-full items-center mt-[20px]">
      <div className="border-2 pl-[24px] p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[16px] h-[63px] shadow-lg">
        <input
          type="text"
          placeholder="Enter name of lodge, city or school"
          className="rounded-full sm:w-[300px] w-[250px]  bg-white outline-none"
        />

        <button className="bg-primary rounded-full flex justify-center items-center text-white px-4">
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg"
            width={30}
            height={40}
            alt=""
          />
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar
