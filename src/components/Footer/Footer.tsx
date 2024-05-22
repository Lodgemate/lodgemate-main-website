import React from "react";

function Footer() {
  return (
    <div className="border border-t flex w-full mt-[100px] py-[12px] text-lgray">
      <div className="flex justify-between flex-wrap w-full px-2 sm:px-[100px]">
        <div className="flex items-center gap-4">
          <p>© 2023 LodgeMate</p>
          <div className="h-[4px] w-[4px] rounded-full bg-[#555555]"></div>
          <p>Terms & Conditions</p>
          <div className="h-[4px] w-[4px] rounded-full bg-[#555555]"></div>
          <p>Contact us</p>
        </div>
        <div>
          <p>With 💕 from LodgeMate</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
