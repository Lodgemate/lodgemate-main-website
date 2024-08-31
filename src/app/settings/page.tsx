"use client";

import React, { useState } from "react";
import AccountInfoModal from "./modal/AccountInfoModal";

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="w-full flex justify-center">
      <div className="my-[100px] max-w-[1200px] flex w-full flex-col border rounded-lg px-4 sm:mx-[100p] min-h-screen text-[16px] text-[#666666]">
        {isModalOpen && <AccountInfoModal onClose={handleCloseModal} />}{" "}
        <div className="py-4 border-b px-4">
          <h1 className="text-[24px] font-semibold text-primary">Settings</h1>{" "}
        </div>
        <div className="flex w-full h-fit justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-4 border-2 rounded-[8px] flex text-start gap-2 items-start m-4"
          >
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720468465/utilities/webspirre/manage_accounts_avb9ot.svg"
              alt=""
            />
            <div>
              <p className="font-bold">Personal & account information</p>
              <p className="">
                You can update your personal information e.g. phone number,
                email...{" "}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
