import React from "react";
import Account from "./buttons/Account";
import Image from "next/image";
import TopBar from "./menus/TopBar";

function index() {
  return (
    <nav className="fixed top-0 w-full">
      <nav className="bg-white flex justify-between px-4 sm:px-[100px] py-4 border-b border-stroke  items-center">
        <Image
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961632/utilities/LodgeMate_File/Vector_15_oyrjmn.svg"
          height={28}
          width={160}
          alt="account"
        />
        <div className="hidden sm:flex">
          <TopBar />
        </div>

        <Account />
      </nav>
    </nav>
  );
}

export default index;
