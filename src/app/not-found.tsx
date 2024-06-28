"use client"

import React from "react";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex mt-[50px] items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719542610/utilities/LodgeMate_File/404_error_with_a_tired_person-pana_1_ylzzjd.svg"
            alt="Centered Image"
            className="max-w-full"
          />
        </div>
        <div className="flex flex-col sm:items-center justify-center">
          <p className="text-center sm:text-start sm:mb-8 mb-[100px] sm:text-[24px]">
            Sorry, the page you&apos;re looking for <br /> does not exist.
          </p>
          <div className="flex sm:flex-row gap-4 flex-col pa">
            <button
              //   onClick={() => window.history.back()}
              className="bg-white border  text-black sm:font-bold py-2 px-4 rounded"
            >
              Back to previous page
            </button>
            <Link href="/">
              <div className="bg-primary flex items-center justify-center hover:bg-bl mt-2 text-white sm:font-bold py-2 px-4 rounded">
                Back to home page
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
