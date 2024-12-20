import React from "react";
import ContactForm from "./ContactForm";
import Link from "next/link";

function ContactUs() {
  return (
    <div className="sm:px-[100px] px-4 text-lblack text-[16px] mt-[100px]">
      <div className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-[50px]">
        {/* form side */}
        <div className=" col-span-1 mt-[54px] sm:mt-0 ">
          <ContactForm />
          <div className="flex items-center pt-[50px]">
            <div className="bg-lgray w-[170px] h-[1px]"></div>
            <p>Other</p>
            <div className="bg-lgray w-[170px] h-[1px]"></div>
          </div>
          <p className="text-[14px] text-dgray mt-[24px]">
            <span className=" underline font-bold text-[16px]">Email:</span>{" "}
            example1@email.com, example2@email.com
          </p>
          <p className="text-[14px] text-dgray mt-[16pxpx]">
            <span className=" underline font-bold text-[16px]">Phone:</span>{" "}
            (+001) 700 500 3823, (+001) 003 492 3030
          </p>

          <div className="flex items-center gap-[24px] mt-[19px]">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719366242/utilities/LodgeMate_File/Facebook_uhejkw.svg"
                alt="facebook"
              />
            </Link>
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719366242/utilities/LodgeMate_File/Instagram_fksw57.svg"
                alt="ig"
              />
            </Link>{" "}
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719366242/utilities/LodgeMate_File/Twitter_otecyo.svg"
                alt="twitter"
              />
            </Link>{" "}
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719366242/utilities/LodgeMate_File/LinkedIn_lynj8p.svg"
                alt="linkedin"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
