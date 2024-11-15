"use client";

import { Logout } from "@/lib/features/Login/signinSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LuMenu } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { selectUser } from "@/lib/features/Auth/authSlice";

export interface NotificationResponse {
  status: string;
  data: NotificationData;
}

export interface NotificationData {
  notifications: Notification[];
}

function More() {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <>
      {currentUser ? (
        <>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <LuMenu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent>
                {navLinks.map(({ url, title }) => (
                  <SheetClose asChild>
                    <Link
                      href={url}
                      key={url}
                      className="flex w-full p-2 rounded-lg hover:bg-zinc-100"
                    >
                      {title}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose className="block text-left w-full">
                  <Link
                    href={`/profile/${currentUser && currentUser?._id}`}
                    className="  w-full p-2 rounded-lg hover:bg-zinc-100 block"
                  >
                    View profile
                  </Link>
                </SheetClose>
                <SheetClose className="block w-full text-left">
                  <Link
                    href="/"
                    onClick={() => {
                      dispatch(Logout());
                    }}
                    className=" w-full p-2 rounded-lg hover:bg-zinc-100 block"
                  >
                    Logout
                  </Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>

          <div className="max-md:hidden">
            <DropdownMenu>
              {/* desktop */}
              <DropdownMenuTrigger className="flex items-end flex-col relative bottom-3">
                <div className="rounded-full bg-red-600 h-5 w-5 grid relative top-2 z-10 -right-1 place-items-center text-xs text-white">
                  0
                </div>
                <div className="px-[13px] py-2 relative rounded-[8px] mb-2 bg-primary">
                  <div className="flex relative text-[14px] text-white font-medium items-center gap-2">
                    <LuMenu className="w-5 h-5" />
                    More
                    <FaAngleDown />
                  </div>
                </div>
              </DropdownMenuTrigger>
              {/* Dropdown modal */}
              <DropdownMenuContent className="w-full min-w-[16.5rem] right-5 relative">
                {navLinks.map(({ title, url }, i) => (
                  <div key={title}>
                    {i % 3 == 0 && i > 1 && <DropdownMenuSeparator />}
                    <DropdownMenuItem>
                      <Link href={url} className="text-gray-700">
                        {title}
                      </Link>
                    </DropdownMenuItem>
                  </div>
                ))}

                <DropdownMenuItem>
                  <Link
                    href={`/profile/${currentUser?._id}`}
                    className="text-gray-700"
                  >
                    View profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/"
                    onClick={() => {
                      dispatch(Logout());
                    }}
                    className="text-gray-700"
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>

              {/* Mobile */}
            </DropdownMenu>
          </div>
        </>
      ) : (
        <>
          <Link href={"/auth/login"}>
            <Button className="">Get Started</Button>
          </Link>
        </>
      )}
    </>
  );
}

export default More;
