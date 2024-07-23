"use client";
import { ObjectValidation, onFocusValidation } from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { selectAllSignindata, selectAllSigninStatus, selectAllSigninError, Signin, setAuthenticated, resetState  } from "@/lib/features/Login/signinSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showEmailOtpModal, showFailedModal, showLoadingModal, showSuccessfulModal } from "@/lib/features/Modal/ModalSlice";
import { fetchForgotPw } from "@/services/forgotPw";

function Forgotpassword() {
  showEmailOtpModal("okechukwu@gmail.com")
  const router = useRouter();
  const dispatch =useAppDispatch()
  const data =useAppSelector(selectAllSignindata)
  const Status =useAppSelector(selectAllSigninStatus)
  const Error =useAppSelector(selectAllSigninError)
  const [submitState, setSubmitState] = useState(false);
  const [locationState, setLocationState] = useState("Use location");
  const loadingRef = useRef(locationState);
  const [formData, setformData] = useState({
    email: "",
  });
  const FormWarning = ({ prop }: any) => {
    if (prop !== null) {
      return <div className='text-red-500 text-xs'>{prop}</div>;
    }
  };
  const handleSubmit=async(e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState(true)
    if (formData.email) {
      dispatch(showLoadingModal("Verifying Email Address"))
      const res = await fetchForgotPw(formData)
      console.log(res)
      if (res === 'success') {
        dispatch(showLoadingModal(null))
        dispatch(showEmailOtpModal(formData.email))
      } else if (res.status === 'fail') {
        dispatch(showLoadingModal(null))
        dispatch(showFailedModal(res.message))
      } 
    }
  }


  return (
  

    <div className='sm:w-[500px] w-full m-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]'>
      <div className='flex w-full items-center justify-center border-b'>
        <h2 className='font-bold mb-4 text-center'>Forgot Password</h2>
      </div>
      <form
        className='px-4  mt-5'
      >
        <div className='email_container pb-3'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e)=>setformData({email: e.target.value})}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {(submitState || formData.email) && (
            <FormWarning prop={onFocusValidation("email", formData.email)} />
          )}
        </div>

        <button
          type='submit'
          onClick={handleSubmit}
          className='w-full px-4 mt-2 py-2 flex justify-center items-center sm:col-span-2  bg-primary text-white rounded-md shadow-sm focus:outline-none'
        >
          Sign In
        </button>
      </form>
      <div>
      </div>
    </div>
  );
};

export default Forgotpassword
