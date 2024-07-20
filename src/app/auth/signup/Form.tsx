"use client";

import { ObjectValidation, onFocusValidation } from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [submitState, setSubmitState] = useState(false)
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    location: {
      address_text: "",
      latitude: "",
      logitutude: "",
      country: "",
      administrativeArea: "",
      subAdministrativeArea: "",
    },
  });
  const UpdateForm =(e:  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    setformData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(submitState)
    setSubmitState(true)
    const validating = await ObjectValidation(formData)
    if (validating) {
      router.push("/auth/signup/verify_your_email")
    }
  };
  const FormWarning=({prop}: any,)=>{
    if (prop !== null) {
      return(
      <div className='text-red-500 text-xs'>{prop}</div>
    )
    }
   }
 const confirmPwCheck =()=>{
    if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
      return  "Password is doesn't match";
    } else if (!formData.confirmPassword) {
      return "Confirm your password"
    } else {
      return null;
    }
 }
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
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.phoneNumber) tempErrors.phoneNumber = "Phone number is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      tempErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };
 
  return (
    <div className='sm:w-[500px] w-full m-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]'>
      <div className='flex w-full items-center justify-center border-b'>
        <h2 className='font-bold mb-4 text-center'>Sign Up</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className='px-4 grid sm:grid-cols-2 gap-y-2 gap-x-3 sm:gap-y-5 mt-3'
      >
        <div className='firstName_container'>
          <input
            type='text'
            name='firstName'
            id='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={UpdateForm}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {submitState && <FormWarning prop={onFocusValidation("firstName", formData.firstName)}/>}
        </div>

        <div className='lastName_container'>
          <input
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={UpdateForm}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {submitState && <FormWarning prop={onFocusValidation("lastName", formData.lastName)}/>}
        </div>

        <div className='phoneNumber_container'>
          <input
            type='text'
            name='phoneNumber'
            id='phoneNumber'
            placeholder='Phone Number'
            value={formData.phoneNumber}
            onChange={UpdateForm}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {(submitState || formData.phoneNumber) && <FormWarning prop={onFocusValidation("phoneNumber", formData.phoneNumber)}/>}
        </div>

        <div className=''>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={formData.email}
            onChange={UpdateForm}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {(submitState || formData.email) && <FormWarning prop={onFocusValidation("email", formData.email)}/>}
        </div>

        <div className=''>
          <select
            name='gender'
            id='gender'
            value={formData.gender}
            onChange={UpdateForm}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          >
            <option value='' disabled>
              Select Gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {submitState && <FormWarning prop={onFocusValidation("gender", formData.gender)}/>}
        </div>
        <div className=''>
          <select
            name='gender'
            id='gender'
            value={formData.gender}
            onChange={UpdateForm}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          >
            <option value='' disabled>
              Select Gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {/* {submitState && <FormWarning prop={onFocusValidation("firstName", formData.firstName)}/>} */}
        </div>

        <div className=''>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter Password'
            value={formData.password}
            onChange={UpdateForm}
            className='mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {(submitState || formData.password) && <FormWarning prop={onFocusValidation("password", formData.password)}/>}
        </div>

        <div className=''>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={UpdateForm}
            className='mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {(submitState || formData.confirmPassword) &&  <FormWarning prop={confirmPwCheck()}/>}
        </div>

        {/* <div className='flex w-full justify-center items-center'> */}

          <button type="submit" className='w-full px-4 mt-2 py-2 flex justify-center items-center sm:col-span-2  bg-primary text-white rounded-md shadow-sm focus:outline-none'>
            Sign Up
          </button>
        {/* </div> */}
       
      </form>
      <div>
          <p className='text-center mt-5'>
            Already have an account?{" "}
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
      <div className='px-4 flex flex-col justify-center items-center pb-[50px] overflow-x-hidden'>
        <div className='flex items-center justify-center pt-[32px]'>
          <div className='bg-lgray w-[210px] h-[1px]'></div>
          <p>OR</p>
          <div className='bg-lgray w-[210px] h-[1px]'></div>
        </div>
        <button className='flex gap-2 w-full border py-3 justify-center items-center rounded-[8px] mt-[32px]'>
          <img
            src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719371440/utilities/LodgeMate_File/flat-color-icons_google_sqyie0.svg'
            alt='google_auth'
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
