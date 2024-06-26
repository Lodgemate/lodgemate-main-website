"use client";

import Link from "next/link";
import React, { useState } from "react";

const SignUpForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    school: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    let tempErrors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      school: "",
      password: "",
      confirmPassword: "",
    };
    if (!firstName) tempErrors.firstName = "First name is required";
    if (!lastName) tempErrors.lastName = "Last name is required";
    if (!phoneNumber) tempErrors.phoneNumber = "Phone number is required";
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email is invalid";
    if (!gender) tempErrors.gender = "Gender is required";
    if (!school) tempErrors.school = "School is required";
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword)
      tempErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log({
        firstName,
        lastName,
        phoneNumber,
        email,
        gender,
        school,
        password,
        confirmPassword,
      });
    }
  };

  return (
    <div className="sm:w-[500px] w-full mx-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]">
      <div className="flex w-full items-center justify-center border-b">
        <h2 className="font-bold mb-4 text-center">Sign Up</h2>
      </div>
      <form onSubmit={handleSubmit} className="px-4">
        <div className="mb-4 mt-[34px] flex gap-4">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>
        {errors.firstName && (
          <div className="text-red-500 text-sm">{errors.firstName}</div>
        )}
        {errors.lastName && (
          <div className="text-red-500 text-sm">{errors.lastName}</div>
        )}

        <div className="mb-4 mt-[20px] flex gap-4">
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>
        {errors.phoneNumber && (
          <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
        )}
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <div className="mb-4 mt-[20px] flex gap-4">
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            name="school"
            id="school"
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>
        {errors.gender && (
          <div className="text-red-500 text-sm">{errors.gender}</div>
        )}
        {errors.school && (
          <div className="text-red-500 text-sm">{errors.school}</div>
        )}

        <div className="mb-4 mt-[20px]">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
        </div>

        <div className="mb-4 mt-[20px]">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="flex w-full justify-center items-center">
          {/* <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md shadow-sm focus:outline-none"
          >
            Sign Up
          </button> */}
          <Link href="/"
            className="w-full px-4 py-2 flex justify-center items-center  bg-primary text-white rounded-md shadow-sm focus:outline-none"
          >
            Sign Up
          </Link>
        </div>
        <div>
          <p className="text-end mt-[12px]">
            Already have an account?{" "}
            <span>
              <Link
                href="/auth/login"
                type="button"
                className="font-bold text-primary hover:underline"
              >
                Log in
              </Link>
            </span>{" "}
          </p>
        </div>
      </form>
      <div className="px-4 flex flex-col justify-center items-center pb-[50px]">
        <div className="flex items-center justify-center pt-[32px]">
          <div className="bg-lgray w-[210px] h-[1px]"></div>
          <p>OR</p>
          <div className="bg-lgray w-[210px] h-[1px]"></div>
        </div>
        <button className="flex gap-2 w-full border py-3 justify-center items-center rounded-[8px] mt-[32px]">
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

export default SignUpForm;
