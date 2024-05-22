import Image from "next/image";
import React from "react";

function Account() {
  return (
    <div>
      {/* desktop */}
      <div className="p-[13px] sm:block hidden rounded-[8px] bg-primary">
        <button className="flex text-[16px] text-white font-medium items-center gap-2">
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715963878/utilities/LodgeMate_File/account_circle_2_sury28.svg"
            height={24}
            width={24}
            alt="account"
          />
          Account
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715962495/utilities/LodgeMate_File/Arrow---Down-2_brihdn.svg"
            height={8}
            width={8}
            alt="account"
          />
        </button>
      </div>

      {/* Mobile */}
      <div className="p-[13px] sm:hidden rounded-[8px] bg-white border-2 border-stroke">
        <button className="flex text-[16px] text-dgr font-medium items-center gap-2">
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715964579/utilities/LodgeMate_File/account_circle_3_lyjkcy.svg"
            height={24}
            width={24}
            alt="account"
          />
          Account
          <Image
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1715964624/utilities/LodgeMate_File/Vector_16_c8ivmb.svg"
            height={8}
            width={8}
            alt="account"
          />
        </button>
      </div>
    </div>
  );
}

export default Account;
