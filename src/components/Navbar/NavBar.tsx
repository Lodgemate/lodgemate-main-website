import React from "react";
import Account from "./buttons/Account";
import Image from "next/image";
import TopBar from "./menus/TopBar";
import More from "./buttons/More";

function index() {
  return (
    <div className="fixed z-40 top-0 w-full bg-white border-b border-stroke justify-center flex ">
      <div className=" flex justify-between px-4 lg:px-[100px]- pt-4 pb-2 lg:pb-0 max-w-[1200px] w-full  items-center">
        <Image
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961632/utilities/LodgeMate_File/Vector_15_oyrjmn.svg"
          height={28}
          width={120}
          alt="account"
        />
        <div className="hidden lg:flex">
          <TopBar />
        </div>
        <Account />
        {/* this is the more button that should only be visible when the user login*/}
        <More />
      </div>
    </div>
  );
}

export default index;
