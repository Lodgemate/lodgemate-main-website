import React from "react";

function Settings() {
  return (
    <div className="my-[100px] border rounded-lg px-4 sm:mx-[100px] min-h-screen text-[16px] text-[#666666]">
      <div className="py-4 border-b px-4">
        <h1 className="text-[24px] font-semibold text-primary">Settings</h1>{" "}
      </div>
      <div className="p-4 border-2 rounded-[8px] flex gap-2 items-start m-4">
        <img
          src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1720468465/utilities/webspirre/manage_accounts_avb9ot.svg"
          alt=""
        />
        <div>
          <p className="font-bold">Personal & account information</p>
          <p className="">
            You can update your personal information e.g. phone number, email...{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
