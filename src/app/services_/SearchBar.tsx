import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function SearchBar() {
  return (
    <div className="flex flex-col justify-center w-full items-center mt-[20px]">
      <div className="border-2 pl-[24px] p-1 flex justify-between border-stroke rounded-full w-full sm:w-[510px] text-[16px] h-[63px] shadow-lg">
        <input
          type="text"
          placeholder="Enter a service e.g. electrician..."
          className="rounded-full sm:w-[300px] w-[250px]- w-full bg-white outline-none mr-2"
        />

        <button className="bg-primary rounded-full flex justify-center items-center text-white px-6">
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961596/utilities/LodgeMate_File/Search_1_tf10cm.svg"
            width={30}
            height={40}
            alt=""
          />
          Search
        </button>
      </div>

      <div className="flex mt-6 sm:gap-2 ">
        <p className='text-[14px]'>
          Your location is set to "Owerri".{" "}
          <span>
            {" "}
            <Link
              href="/"
              className="font-bold text-lblue border-b border-lblue"
            >
              {" "}
              Change location
            </Link>
          </span>{" "}
        </p>{" "}
      </div>
    </div>
  );
}

export default SearchBar
