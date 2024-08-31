import React from 'react'
import VerifyEmailForm from './Form';

function VerifyEmail() {
  return (
    <div className=" relative text-[12px] sm:text-[14px]">
      <div className="flex w-full h-[900px] bg-black opacity-[12%] "></div>
      <div className=" absolute top-1 flex w-full px-2">
        <VerifyEmailForm />
      </div>
    </div>
  );
}

export default VerifyEmail
