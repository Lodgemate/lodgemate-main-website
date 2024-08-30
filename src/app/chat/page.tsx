"use client"
import React from "react";
import DesktopChat from "./DesktopChat";
import MobileChat from "./MobileChat";


const Chat=()=> {
  return (
    <div className=" flex justify-center  text-[14px]">
      <div className="lg:block hidden w-full max-w-[1200px] border">
        <DesktopChat />
      </div>
      <div className="lg:hidden w-full max-w-[1200px] border block">
        {" "}
        <MobileChat />
      </div>
    </div>
  );
}

export default Chat;
