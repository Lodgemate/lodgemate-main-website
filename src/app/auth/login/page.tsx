"use client";
import React from "react";
import LoginForm from "./Form";
import withAuth from "@/components/restrictedRoute/Authenticated";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/Auth/authSlice";

function Login() {
  const currentUser = useAppSelector(selectUser);

  if (currentUser?._id) redirect("../../");

  return (
    <div className=" relative text-[14px]">
      <div className="flex w-full h-[900px] bg-black opacity-[12%] "></div>
      <div className=" px-2 absolute top-1 flex w-full">
        <LoginForm />
      </div>
    </div>
  );
}

export default withAuth(Login);
