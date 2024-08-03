import React from "react";
import Account from "./buttons/Account";
import Image from "next/image";
import TopBar from "./menus/TopBar";
import More from "./buttons/More";

function index() {
  return (
    <nav className="fixed z-50 top-0 w-full">
      <nav className="bg-white flex justify-between px-4 lg:px-[100px] pt-4 pb-2 lg:pb-0 border-b border-stroke  items-center">
        <Image
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961632/utilities/LodgeMate_File/Vector_15_oyrjmn.svg"
          height={28}
          width={160}
          alt="account"
        />
        <div className="hidden lg:flex">
          <TopBar />
        </div>
          <Account />
        {/* this is the more button that should only be visible when the user login*/}
          <More />
      </nav>
    </nav>
  );
}

export default index;
