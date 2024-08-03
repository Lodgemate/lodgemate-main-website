"use client";

import { reverseGeocoding } from "@/services/geolocatorApi";
import { ObjectValidation, onFocusValidation } from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  selectAlldata,
  selectAllStatus,
  selectAllError,
  SignUp,
} from "@/lib/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  showEmailOtpModal,
  showFailedModal,
  showLoadingModal,
  showSuccessfulModal,
} from "@/lib/features/Modal/ModalSlice";
import EmailModal, { hidemail } from "@/Ui/shared/EmailModal";
import {
  resetState,
  selectAllSignindata,
  setAuthenticated,
  Signin,
} from "@/lib/features/Login/signinSlice";
import { verifyEmail } from "@/services/verifyEmail";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAlldata);
  const Status = useAppSelector(selectAllStatus);
  const Error = useAppSelector(selectAllError);
  const signedInData = useAppSelector(selectAllSignindata);
  const [submitState, setSubmitState] = useState(false);
  const [locationState, setLocationState] = useState("Use your location");
  const loadingRef = useRef(locationState);
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
      longitude: "",
      country: "",
      administrativeArea: "",
      subAdministrativeArea: "",
    },
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
  const confirmPwCheck = () => {
    if (
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      return "Password is doesn't match";
    } else if (!formData.confirmPassword) {
      return "Confirm your password";
    } else {
      return null;
    }
  };
  const handleLocation = async () => {
    dispatch(showLoadingModal("Fetching Location"));
    setLocationState((prev) => {
      loadingRef.current = "searching...";
      return loadingRef.current;
    });
    const currentLocation = await reverseGeocoding();
    if (typeof currentLocation === "string") {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal("Location permission denied"));
    } else if (typeof currentLocation === "object") {
      setformData({ ...formData, location: currentLocation });
      setLocationState((prev) => {
        loadingRef.current = currentLocation.address_text;
        return loadingRef.current;
      });
      dispatch(showLoadingModal(null));
    } else {
      setLocationState((prev) => {
        loadingRef.current = "Use your location";
        dispatch(showLoadingModal(null));
        dispatch(showFailedModal("Something went wrong, Try again"));
        return loadingRef.current;
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState(true);
    const validating = await ObjectValidation(formData);
    const Locationvalidating = await ObjectValidation(formData.location);
    if (validating && Locationvalidating) {
      dispatch(showLoadingModal("Creating account"));
      // @ts-ignore
      const response = await dispatch(SignUp(formData));
      if (response.payload.status === "success") {
        dispatch(showLoadingModal("Sigining in"));
        const credentials = {
          email: formData.email,
          password: formData.password,
        };

        // @ts-ignore
        const signin = await dispatch(Signin(credentials));
        // verifyEmail
        console.log(signin);
      } else if (
        response.payload.status === "fail" &&
        response.payload.message
      ) {
        dispatch(showLoadingModal(null));
        dispatch(showFailedModal(response.payload.message));
      }
      console.log(response.payload);
      console.log(response.payload.status);
      console.log(response.payload.err.errors);
      console.log(Error);
      // console.log(data.json())
      console.log(Status);
      // router.push("/auth/signup/verify_your_email");
      dispatch(showLoadingModal(null));
    }
  };
  console.log(data);
  console.log(Error);
  // console.log(data.json())
  console.log(Status);
  useEffect(() => {
    const worker =async()=>{
    if (Error) {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal(Error));
      dispatch(resetState());
    }
    if (signedInData === null) {
      return;
    }
    console.log(signedInData.status);
    if (signedInData.status === "success" && signedInData.token) {
      console.log(signedInData.token);
      localStorage.setItem("token", JSON.stringify(signedInData.token));
      dispatch(setAuthenticated());
      // dispatch(showLoadingModal(null));
      // dispatch(showSuccessfulModal("login Successful"));
      // dispatch(showSuccessfulModal(null));
      const res = await verifyEmail({email :formData.email});
      console.log(res)
      if (res.status === "success") {
        hidemail(formData.email)
       
        router.push("/auth/signup/verify_your_email");
      } else if (res.status === "fail") {
  }

     
      // router.back()
    } else if (!signedInData.status) {
      dispatch(showLoadingModal(null));
      dispatch(showFailedModal(signedInData));
      dispatch(resetState());
    }
    }
    worker()
  }, [signedInData, Status, Error]);

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
          {submitState && (
            <FormWarning
              prop={onFocusValidation("firstName", formData.firstName)}
            />
          )}
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
          {submitState && (
            <FormWarning
              prop={onFocusValidation("lastName", formData.lastName)}
            />
          )}
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
          {(submitState || formData.phoneNumber) && (
            <FormWarning
              prop={onFocusValidation("phoneNumber", formData.phoneNumber)}
            />
          )}
        </div>

        <div className='email_container'>
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

        <div className='gender_container'>
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
          {submitState && (
            <FormWarning prop={onFocusValidation("gender", formData.gender)} />
          )}
        </div>
        {/* location field */}
        <div className=''>
          <input
            name='location'
            id='location'
            type='button'
            value={locationState}
            className='text-truncate mt-1 text-start  block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text '
            onClick={handleLocation}
          />
          
          {submitState && locationState === "Use your location" && (
            <>
              <div className='text-red-500 text-'>
                Your location is not set
              </div>
            </>
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
          {(submitState || formData.confirmPassword) && (
            <FormWarning prop={confirmPwCheck()} />
          )}
        </div>

        <button
          type='submit'
          className='w-full px-4 mt-2 py-2 flex justify-center items-center sm:col-span-2  bg-primary text-white rounded-md shadow-sm focus:outline-none'
        >
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

export default SignUpForm;
