"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const VerifyEmailForm: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("example@email.com"); // You can replace this with the actual email
  const [showPopup, setShowPopup] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

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

  const handleSkipForLater = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, router]);

  return (
    <div className="sm:w-[500px] w-full mx-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]">
      <div className="flex w-full items-center justify-center border-b">
        <h2 className="font-bold mb-4 text-center">Verify your phone number</h2>
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
            type="button"
            onClick={handleSkipForLater}
            className="w-full px-4 py-2 bg-white text-lgray border rounded-md shadow-sm focus:outline-none"
          >
            Skip for later
          </button>
        </div>
        <div className="flex w-full justify-center items-center mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md shadow-sm focus:outline-none"
          >
            Verify now
          </button>
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 py-[100px] text-center">
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719540118/utilities/LodgeMate_File/simple-line-icons_check_ikhsin.svg"
              alt="welcome"
            />
            <h1 className="text-2xl font-bold mb-2">All done</h1>
            <p>
              Your sign up is now complete. You may <br /> proceed to our home screen
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailForm;
