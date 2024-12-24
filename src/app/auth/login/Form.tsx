"use client";

import { ObjectValidation, onFocusValidation } from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  selectAllSignindata,
  selectAllSigninStatus,
  selectAllSigninError,
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
import { setToken } from "@/lib/features/Auth/tokenSlice";
import axios from "axios";
import { Endpoints } from "@/services/Api/endpoints";
import { setUser } from "@/lib/features/Auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const data = useAppSelector(selectAllSignindata);
  const Status = useAppSelector(selectAllSigninStatus);
  const Error = useAppSelector(selectAllSigninError);

  const [submitState, setSubmitState] = useState(false);
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
      return <div className="text-red-500 text-">{prop}</div>;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      dispatch(showLoadingModal("Validating Credentials"));
      setSubmitState(true);

      dispatch(showLoadingModal("Authenticating"));
      const response = await axios.post(Endpoints.signIn, formData);
      console.log({ response });
      if (response.data.status == "success") {
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.token));
        localStorage.setItem("token", response.data.token);
        toast({
          variant: "default",
          title: "Logged in successfully",
        });
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error: any) {
      console.log({ error });
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data.message,
      });
    } finally {
      dispatch(showLoadingModal(null));
    }
  };

  const handleAuthWithGoogle = async (code: string) => {
    dispatch(showLoadingModal("Fetching data"));
    try {
      const res = await axios.post(Endpoints.googleAuth, {
        code,
      });
      console.log({ res });

      dispatch(setUser(res.data.data.user));
      dispatch(setToken(res.data.token));
      setTimeout(() => {
        router.push("/");
      }, 0);
    } catch (error: any) {
      console.error(error);
      dispatch(showFailedModal(error.message || "Something went wrong"));
    } finally {
      dispatch(showLoadingModal(null));
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");
    console.log({ code });

    if (code) {
      handleAuthWithGoogle(code);
    }
  }, []);

  return (
    <div className="sm:w-[500px] w-full m-auto py-4 bg-white text-lgray text- rounded-2xl shadow-md border mt-[100px]">
      <div className="flex w-full items-center justify-center border-b">
        <h2 className="font-bold mb-4 text-center">Sign In</h2>
      </div>
      <form onSubmit={handleSubmit} className="px-4  mt-5">
        <div className="email_container pb-3">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={UpdateForm}
            className="mt-1 block h-[48px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
          {(submitState || formData.email) && (
            <FormWarning prop={onFocusValidation("email", formData.email)} />
          )}
        </div>
        <div className="">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={UpdateForm}
            className="mt-1 block w-full h-[48px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
          {(submitState || formData.password) && (
            <FormWarning
              prop={onFocusValidation("password", formData.password)}
            />
          )}
        </div>
        <p className=" mt-3 hover:text-primary text-[12px]">
          <Link href="/auth/forgotpassword">Forgot Password</Link>
        </p>
        <button
          type="submit"
          className="w-full px-4 mt-2 py-2 flex justify-center items-center sm:col-span-2  bg-primary text-white rounded-md shadow-sm focus:outline-none"
        >
          Sign In
        </button>
      </form>
      <div>
        <p className=" text-center text-[12px] mt-[12px]">
          Don&apos;t have an account?{" "}
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
      <div className="px-4 flex flex-col justify-center items-center pb-[50px] overflow-x-hidden">
        <div className="flex items-center justify-center pt-[32px]">
          <div className="bg-lgray w-[210px] h-[1px]"></div>
          <p>OR</p>
          <div className="bg-lgray w-[210px] h-[1px]"></div>
        </div>
        <button className="flex gap-2 w-full text-[14px] border py-3 justify-center items-center rounded-[8px] mt-[32px]">
          <a
            href="https://api.lodgemate.com.ng/v1/user/auth/google"
            target="_blank"
            className="flex gap-2"
          >
            <img
              src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719371440/utilities/LodgeMate_File/flat-color-icons_google_sqyie0.svg"
              alt="google_auth"
            />
            Continue with Google
          </a>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
