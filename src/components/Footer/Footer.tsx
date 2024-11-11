"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  if (pathname === "/chat" || pathname === "/help_and_support") {
    return null;
  }
  return (
    <div className=" text-[12px] border-t flex w-full border-2 sm:pb-[20px]  pb-[100px]  py-[12px] sm:bg-white bg-[#F8F8F8] text-lgray">
      <div className="flex justify-between items-center flex-col sm:flex-row w-full px-2 sm:px-[100px]">
        <div className="flex w-full flex-col sm:flex-row items-center gap-4">
          <p className="sm:block hidden">© 2023 LodgeMate</p>
          <Link
            href="/terms_and_conditions"
            className="flex items-center gap-2 sm:border-b-0 border-b"
          >
            <div className="h-[4px] w-[4px] rounded-full sm:block hidden bg-[#555555]"></div>
            <p>Terms & Conditions</p>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 sm:border-b-0 border-b"
          >
            <div className="h-[4px] w-[4px] rounded-full sm:block hidden bg-[#555555]"></div>
            <p>Contact us</p>
          </Link>
          <Link href="/about-us" className="flex items-center gap-2">
            <div className="h-[4px] rounded-full border-2 sm:block hidden bg-[#555555]"></div>
            <p>About Us</p>
          </Link>
        </div>
        <div className="flex sm:w-full px-4 flex-row sm:justify-end justify-between items-center text-[12px] gap-4 sm:mt-0 mt-[100px]">
          <p className="sm:hidden">© 2023 LodgeMate</p>

          <p>With 💕 from LodgeMate</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
