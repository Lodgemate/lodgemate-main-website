"use client"
import React, { Suspense } from "react";
import DesktopChat from "./DesktopChat";
import MobileChat from "./MobileChat";


const Chat=()=> {
  return (
    <div className=" flex justify-center  text-[14px]">
      <Suspense fallback={<>Loading.....</>}>
       <DesktopChat />
      </Suspense>
      {/* <div className="lg:hidden w-full max-w-[1200px] border block">
        {" "}
        <MobileChat />
      </div> */}
    </div>
  );
}

export default Chat;
