"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function BottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed lg:hidden flex w-full bottom-0">
      <div className="flex w-full justify-center border-stroke bg-white border-t p-2">
        <div className="flex items-center text-[16px] text-dgray gap-12">
          <Link href="/" className="flex-col  flex justify-center items-center">
            <Image
              src={
                pathname === "/" || pathname.includes("/lodges")
                  ? "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716807199/utilities/LodgeMate_File/HouseLine_ts7oua.svg"
                  : "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715976699/utilities/LodgeMate_File/HouseLine_fzjq5q.svg"
              }
              height={24}
              width={24}
              alt="lodge"
            />
            <p
              className={
                pathname === "/" || pathname.includes("/lodges")
                  ? "text-primary border-b-4 pb-2 border-primary"
                  : "pb-2"
              }
            >
              Lodge
            </p>
          </Link>
          <Link
            href="/roommates"
            className=" flex-col flex justify-center items-center"
          >
            <Image
              src={
                pathname === "/roommates" || pathname.includes("/roommates")
                  ? "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716807199/utilities/LodgeMate_File/Friends_ukbqk0.svg"
                  : "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961598/utilities/LodgeMate_File/Friends_dgallb.svg"
              }
              height={24}
              width={24}
              alt="Roommates"
            />
            <p
              className={
                pathname === "/roommates" || pathname.includes("/roommates")
                  ? "text-primary pb-2 border-b-4 border-primary"
                  : "pb-2"
              }
            >
              Roommates
            </p>
          </Link>
          <Link
            href="/services_"
            className=" flex-col flex justify-center items-center"
          >
            <Image
              src={
                pathname === "/services_" || pathname.includes("/services_")
                  ? "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1716812220/utilities/LodgeMate_File/Frame_39530_vskwxe.svg"
                  : "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961597/utilities/LodgeMate_File/Frame_r45mxx.svg"
              }
              height={24}
              width={24}
              alt="services"
            />
            <p
              className={
                pathname === "/services_" || pathname.includes("/services_")
                  ? "text-primary pb-2 border-b-4 border-primary"
                  : "pb-2"
              }
            >
              Services
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
