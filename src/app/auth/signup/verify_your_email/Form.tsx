"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { fetchForgotPw, fetchResetPw } from "@/services/forgotPw";
import { showEmailOtpModal, showFailedModal, showLoadingModal, showSuccessfulModal } from "@/lib/features/Modal/ModalSlice";
import { useAppDispatch } from "@/lib/hooks";
import { onFocusValidation } from "@/utils/formValidation";
import { useRouter } from "next/navigation";
import { fetchverifyEmailPost, verifyEmail } from "@/services/verifyEmail";

const VerifyEmailForm = () => {
     const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("example@email.com"); // You can replace this with the actual email
  const [submitState, setsubmitState] = useState(false); // You can replace this with the actual email
  const [emailhide, setEmailhide] = useState("example@email.com"); // You can replace this with the actual email
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch= useAppDispatch();
  const router = useRouter();
useEffect(()=>{
  dispatch(showEmailOtpModal(null))
  dispatch(showLoadingModal(null));

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
    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      // Automatically focus on the last input field after pasting
      inputsRef.current[5]?.focus();
    }
  };
  // handle failed Otp
  const handlefailedOtp=async(e: React.FormEvent) => {
    e.preventDefault();
    if (emailhide) {
      dispatch(showLoadingModal("Verifying Email Address"))
      const res = await verifyEmail({"email": emailhide})
      console.log(res)
      if (res.status === 'success') {
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
// warning mssg
  const FormWarning = ({ prop }: any) => {
    if (prop !== null) {
      return <div className='text-red-500 text-'>{prop}</div>;
    }
  };

  // check for otp
  const otpCheck = () => {
    const otpCode = otp.join("");
    if (
      otpCode.length !== 6
    ) {
      return "OTP is invalid";
    } else {
      return null;
    }
  };
  // handle submit of form
  const handleSubmit = async(e: React.FormEvent) => {
    setsubmitState(true)
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6 ) {
      dispatch(showLoadingModal('Verifying email'))
      const res = await fetchverifyEmailPost({otp: otpCode})
      if (res.status === 'success') {
        dispatch(showLoadingModal(null))
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("hiddenemail")
        dispatch(showSuccessfulModal("Password updated"))
        setTimeout(() => {
        dispatch(showSuccessfulModal(null))
         router.push('/')
        }, 1000);
        
      } else if (res.status === 'fail') {
        dispatch(showLoadingModal(null))
        dispatch(showFailedModal(res.message))
      } 
      console.log(res)
    }
    
    console.log("Entered OTP:", otpCode);
    console.log( otpCode.length);
    // Add your verification logic here
    // clean up sessionStorage
  };
  return (
    <div className="sm:w-[500px] w-full mx-auto py-4 bg-white text-lgray text] rounded-2xl shadow-md border mt-[100px]">
      <div className="flex w-full items-center justify-center border-b">
        <h2 className="font-bold mb-4 text-center">Verify Email </h2>
      </div>
      <form onSubmit={handleSubmit} className="px-4">
        <div className="mb-4 mt-[34px]">
          <label htmlFor="otp" className="block text-center mb-2">
            Please enter the 6-digit code we sent to {email}
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
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-center tex border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            ))}
            
          </div>
          <div className="flex justify-center items-center">
 {(submitState) && (
            <FormWarning prop={otpCheck()} />
          )} 

          </div>
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


export default VerifyEmailForm