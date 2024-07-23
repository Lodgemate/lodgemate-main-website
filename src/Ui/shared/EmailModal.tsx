"use client";

import { reverseGeocoding } from "@/services/geolocatorApi";
import { ObjectValidation, onFocusValidation } from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import {
  selectAlldata,
  selectAllStatus,
  selectAllError,
  SignUp,
} from "@/lib/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAllemailOtpModalModalMssg,
  showFailedModal,
  showLoadingModal,
  showSuccessfulModal,
} from "@/lib/features/Modal/ModalSlice";
import Blurbg from "./Blurbg";

const EmailModal = () => {
  const modalMssg = useAppSelector(selectAllemailOtpModalModalMssg);
  const hidemail=(mail: string)=>{
    const astericGenerator=(number: number)=>{
      return '*'.repeat(number)
    }
    let splitmail = mail.split('@');
    let splitlen= mail.length
    console.log(splitmail)
    const nothidden =splitmail[0].substring(0,3)
    console.log(nothidden)
    const nhidden =splitmail[0].substring(3,splitlen)
    console.log(nhidden)
    const asterics =astericGenerator(nhidden.length)
    console.log(asterics)
let generatedMail = nothidden + asterics+ "@" + splitmail[1]
return generatedMail
}
  return (
    <>
    {  modalMssg && (
      <Blurbg>
        <div className='sm:w-[400px] w-fit h-fit py-5 px-5  grid place-items-center bg-white text-lgray text-[16px] rounded-2xl shadow-md border '>
          <p className='font-medium mb-4 text-center'>
            We have sent an otp {hidemail(modalMssg)} <br />
            Check your mail for your one time password
          </p>
          <button
            type='submit'
            className='w-1/2 px-4 mt-2 py-2 flex justify-center items-center   bg-primary text-white rounded-md shadow-sm focus:outline-none'
          >
            Continue
          </button>
          {/* </div> */}
          <div>
            <p className='text-center mt-5'>
              Can't verify now?{" "}
              <span>
                <Link
                  href='/auth/login'
                  type='button'
                  className='font-bold text-primary hover:underline'
                >
                  Log in
                </Link>
              </span>{" "}
            </p>
          </div>
        </div>
      </Blurbg>
      )}
    </>
  );
};

export default EmailModal;
