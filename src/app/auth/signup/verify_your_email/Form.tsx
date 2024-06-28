"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

const VerifyEmailForm: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("example@email.com"); // You can replace this with the actual email
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);
    // Add your verification logic here
  };

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
        <div className="flex w-full justify-center items-center mt-[100px]">
          <button
            type="submit"
            className="w-full hidden px-4 py-2 bg-primary text-white rounded-md shadow-sm focus:outline-none"
          >
            Verify
          </button>
          <Link href="/auth/signup/verify_your_phone"
            type="submit"
            className="w-full flex justify-center items-center  px-4 py-2 bg-primary text-white rounded-md shadow-sm focus:outline-none"
          >
            Verify
          </Link>
        </div>
        <div className="text-center mt-4">
          <p>
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

export default VerifyEmailForm;
