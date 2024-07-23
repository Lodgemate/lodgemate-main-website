"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { fetchForgotPw } from "@/services/forgotPw";
import { showEmailOtpModal, showFailedModal, showLoadingModal, showSuccessfulModal } from "@/lib/features/Modal/ModalSlice";
import { useAppDispatch } from "@/lib/hooks";

const ChangePassword = () => {
     const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("example@email.com"); // You can replace this with the actual email
  const [emailhide, setEmailhide] = useState("example@email.com"); // You can replace this with the actual email
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch= useAppDispatch();
useEffect(()=>{
    const email =sessionStorage.getItem("email")
    const emailhid =sessionStorage.getItem("hiddenemail")
    if(email && emailhid){
        setEmail(JSON.parse(email))
        setEmailhide(JSON.parse(emailhid))
    }
},[])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if the current one is filled
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = e;

    if (key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text");
    if (/^\d{4}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      // Automatically focus on the last input field after pasting
      inputsRef.current[3]?.focus();
    }
  };
  const handlefailedOtp=async(e: React.FormEvent) => {
    e.preventDefault();
    if (emailhide) {
      dispatch(showLoadingModal("Verifying Email Address"))
      const res = await fetchForgotPw({"email": emailhide})
      console.log(res)
      if (res === 'success') {
        dispatch(showLoadingModal(null))
        dispatch(showEmailOtpModal(emailhide))
        dispatch(showEmailOtpModal(null))
        dispatch(showSuccessfulModal("Email Sent"))
        setTimeout(() => {
        dispatch(showSuccessfulModal(null))
         location.reload() 
        }, 1000);
        
      } else if (res.status === 'fail') {
        dispatch(showLoadingModal(null))
        dispatch(showFailedModal(res.message))
      } 
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);
    // Add your verification logic here
    // clean up sessionStorage
  };
console.log(email)
  return (
    <div className="sm:w-[500px] w-full mx-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]">
      <div className="flex w-full items-center justify-center border-b">
        <h2 className="font-bold mb-4 text-center">Verify your email</h2>
      </div>
      <form onSubmit={handleSubmit} className="px-4">
        <div className="mb-4 mt-[34px]">
          <label htmlFor="otp" className="block text-center mb-2">
            Please enter the 4-digit code we sent to {email}
          </label>
          <div className="flex justify-center gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                maxLength={1}
                // @ts-ignore
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-[50px] h-[50px] text-center text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            ))}
          </div>
        </div>
        <div className=''>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter New Password'
            // value={formData.password}
            // onChange={UpdateForm}
            className='mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {/* {(submitState|| formData.password ) && (
            <FormWarning prop={onFocusValidation("password", formData.password)} />
          )} */}
        </div>
        <div className=''>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Confirm New Password'
            // value={formData.password}
            // onChange={UpdateForm}
            className='mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {/* {(submitState|| formData.password ) && (
            <FormWarning prop={onFocusValidation("password", formData.password)} />
          )} */}
        </div>
        <div className="flex w-full justify-center items-center mt-[100px]">
          {/* <button
            type="submit"
            className="w-full hidden px-4 py-2 bg-primary text-white rounded-md shadow-sm focus:outline-none"
          >
            Verify
          </button> */}
          <button 
            type="submit"
            onClick={handleSubmit}
            className="w-full flex justify-center items-center  px-4 py-2 bg-primary text-white rounded-md shadow-sm focus:outline-none"
          >
            Verify
          </button> 
        </div>
        <div className="text-center mt-4">
          <p
          onClick={handlefailedOtp}
          >
            Didn’t receive a code?{" "}
            <span className="font-bold text-primary hover:underline cursor-pointer">
              Re-send code
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};


export default ChangePassword