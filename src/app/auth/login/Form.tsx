"use client";

import { ObjectValidation, onFocusValidation } from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { selectAllSignindata, selectAllSigninStatus, selectAllSigninError, Signin, setAuthenticated  } from "@/lib/features/Login/signinSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const LoginForm: React.FC = () => {
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
    password: "",
  });
  
  const UpdateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const FormWarning = ({ prop }: any) => {
    if (prop !== null) {
      return <div className='text-red-500 text-xs'>{prop}</div>;
    }
  };


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState(true);
    const validating = await ObjectValidation(formData);
    if (validating ) {
      // @ts-ignore
      const response =await dispatch(Signin(formData))
  
      console.log(data)
      console.log(Error)
      // console.log(data.json())
      console.log(Status)
      // router.push("/auth/signup/verify_your_email");
    }
  };
  useEffect(()=>{
    if (data === null) {
      return 
    }
    console.log(data)
      if (data.status === 'success') {
        console.log(data.token)
        localStorage.setItem("token", JSON.stringify(data.token) )
         dispatch(setAuthenticated());
      }
  },[data])
  console.log(data)
      console.log(Error)
      // console.log(data.json())
      console.log(Status)
  return (
    <div className='sm:w-[500px] w-full m-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]'>
      <div className='flex w-full items-center justify-center border-b'>
        <h2 className='font-bold mb-4 text-center'>Sign In</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className='px-4  mt-5'
      >
        <div className='email_container pb-3'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={formData.email}
            onChange={UpdateForm}
            className='mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          />
          {(submitState || formData.email) && (
            <FormWarning prop={onFocusValidation("email", formData.email)} />
          )}
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
          {(submitState|| formData.password ) && (
            <FormWarning prop={onFocusValidation("password", formData.password)} />
          )}
        </div>
        <button
          type='submit'
          className='w-full px-4 mt-2 py-2 flex justify-center items-center sm:col-span-2  bg-primary text-white rounded-md shadow-sm focus:outline-none'
        >
          Sign In
        </button>
      </form>
      <div>
      <p className=" text-center mt-[12px]">
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

export default LoginForm;
