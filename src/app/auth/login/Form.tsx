"use client";

import { ObjectValidation, onFocusValidation } from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  selectAllSignindata,
  selectAllSigninStatus,
  selectAllSigninError,
  Signin,
  setAuthenticated,
  resetState,
} from "@/lib/features/Login/signinSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  showFailedModal,
  showLoadingModal,
  showSuccessfulModal,
} from "@/lib/features/Modal/ModalSlice";
import { GoogleAuth } from "@/services/GoogleAuth";
import withAuth from "@/components/restrictedRoute/Authenticated";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllSignindata);
  const Status = useAppSelector(selectAllSigninStatus);
  const Error = useAppSelector(selectAllSigninError);
  const [submitState, setSubmitState] = useState(false);
  const [locationState, setLocationState] = useState("Use location");
  const loadingRef = useRef(locationState);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  // update form on change os the inputs
  const UpdateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  //  form waning mssg
  const FormWarning = ({ prop }: any) => {
    if (prop !== null) {
      return <div className='text-red-500 text-xs'>{prop}</div>;
    }
  };
  // handle submit of dorm
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(showLoadingModal("Validating Credentials"));
    setSubmitState(true);
    const validating = await ObjectValidation(formData);
    if (validating) {
      dispatch(showLoadingModal("Authenticating"));
      // @ts-ignore
      const response = await dispatch(Signin(formData));
      // router.push("/auth/signup/verify_your_email");
    }
  };
  ///handle google auth
  const handleAuthwithGoogle = async (code: string) => {
    dispatch(showLoadingModal("Fetching data"));
    const res = await GoogleAuth({ code: code });
    if (res.status === "success") {
      localStorage.setItem("token", JSON.stringify(res.token));
      dispatch(setAuthenticated());
      dispatch(showLoadingModal(null));
      dispatch(showSuccessfulModal("login Successful"));
      setTimeout(() => {
        dispatch(showSuccessfulModal(null));
        router.push("/");
      }, 10000);
    } else if (res.status === "fail") {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal(res.message));
      dispatch(resetState());
      router.push("/auth/login");
    } else {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal("something went wrong"));
      dispatch(resetState());
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      const parsedCode = code.substring(3, code.length);
      handleAuthwithGoogle("4%2F0" + parsedCode);
    }
    // check for err
    if (Error) {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal(Error));
      dispatch(resetState());
    }
    // check if data is true before proceeding
    if (data === null) {
      return;
    }
    console.log(data)

    if (data.status === "success") {
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch(setAuthenticated());
      dispatch(showLoadingModal(null));
      dispatch(showSuccessfulModal("login Successful"));
      dispatch(showSuccessfulModal(null));
      router.push("/");
    } else if (!data.status) {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal(data));
      dispatch(resetState());
    }
  }, [data, Status, Error]);
  return (
    <div className='sm:w-[500px] w-full m-auto py-4 bg-white text-lgray text-[16px] rounded-2xl shadow-md border mt-[100px]'>
      <div className='flex w-full items-center justify-center border-b'>
        <h2 className='font-bold mb-4 text-center'>Sign In</h2>
      </div>
      <form onSubmit={handleSubmit} className='px-4  mt-5'>
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
          {(submitState || formData.password) && (
            <FormWarning
              prop={onFocusValidation("password", formData.password)}
            />
          )}
        </div>
        <p className=' mt-3 hover:text-primary'>
          <Link href='/auth/forgotpassword'>Forgot Password</Link>
        </p>
        <button
          type='submit'
          className='w-full px-4 mt-2 py-2 flex justify-center items-center sm:col-span-2  bg-primary text-white rounded-md shadow-sm focus:outline-none'
        >
          Sign In
        </button>
      </form>
      <div>
        <p className=' text-center mt-[12px]'>
          Don’t have an account?{" "}
          <span>
            <Link
              href='/auth/signup'
              type='button'
              className='font-bold text-primary hover:underline'
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
          <a
          href='https://api.lodgemate.com.ng/v1/user/auth/google'
          target='_blank'
          className="flex gap-2"
        >
            <img
              src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719371440/utilities/LodgeMate_File/flat-color-icons_google_sqyie0.svg'
              alt='google_auth'
            />
            Continue with Google{" "}
            </a>
          </button>
      </div>
    </div>
  );
};

export default LoginForm;
