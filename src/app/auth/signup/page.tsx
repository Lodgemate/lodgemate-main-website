'use client'
import React from 'react';
import SignUpForm from "./Form";
import withAuth from '@/components/restrictedRoute/Authenticated';


function SignUp() {
  return (
    <div className=" relative text-[12px] sm:text-[14px]">
      <div className="flex w-full h-[900px] bg-black opacity-[12%] "></div>
      <div className=" absolute top-1 flex w-full px-2">
        <SignUpForm />
      </div>
    </div>
  );
}

export default withAuth(SignUp)
