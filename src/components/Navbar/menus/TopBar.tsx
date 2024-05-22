import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopBar() {
  return (
    <div className="flex items-center text-[16px] text-dgray gap-8">
      <Link href="/" className="flex-col  flex justify-center items-center">
        <Image
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715976699/utilities/LodgeMate_File/HouseLine_fzjq5q.svg"
          height={24}
          width={24}
          alt="lodge"
        />
        <p className="">Lodge</p>
      </Link>
      <Link
        href="/roommates"
        className=" flex-col flex justify-center items-center"
      >
        <Image
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961598/utilities/LodgeMate_File/Friends_dgallb.svg"
          height={24}
          width={24}
          alt="Roommates"
        />
        <p>Roommates</p>
      </Link>
      <Link
        href="/services_"
        className=" flex-col flex justify-center items-center"
      >
        <Image
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715961597/utilities/LodgeMate_File/Frame_r45mxx.svg"
          height={24}
          width={24}
          alt="services"
        />
        <p>Services</p>
      </Link>
    </div>
  );
}

export default TopBar;
