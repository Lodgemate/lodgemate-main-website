"use client";

import Link from "next/link";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email is invalid";
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password });
    }
  };

  return (
    <div className="w-full sm:w-[500px] mx-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]">
      <div className="flex w-full items-center justify-center border-b  ">
        <h2 className=" font-bold mb-4 text-center ">Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="px-4">
        <div className="mb-4 mt-[34px]">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>

        <div className="mb-4 mt-[20px]">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
        </div>

        <div className="sm:mb-[200px] mb-[70px] text-right ">
          <Link
            href="/auth/forgotpassword"
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md shadow-sm  focus:outline-none "
          >
            Log In
          </button>
        </div>
        <div>
          <p className=" text-end mt-[12px]">
            Don’t have an account?{" "}
            <span>
              <Link
                href="/auth/signup"
                type="button"
                className="font-bold text-primary hover:underline"
              >
                Sign up
              </Link>
            </span>{" "}
          </p>
        </div>
      </form>
      <div className="px-4 flex flex-col justify-center items-center pb-[50px] ">
        <div className="flex items-center justify-center pt-[32px]">
          <div className="bg-lgray w-[210px] h-[1px]"></div>
          <p>OR</p>
          <div className="bg-lgray w-[210px] h-[1px]"></div>
        </div>

        <button className="flex gap-2 w-full border py-3 justify-center items-center rounded-[8px] mt-[32px]  ">
          <img
            src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719371440/utilities/LodgeMate_File/flat-color-icons_google_sqyie0.svg"
            alt="google_auth"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
