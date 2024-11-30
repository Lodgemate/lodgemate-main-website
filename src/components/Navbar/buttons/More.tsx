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
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LuMenu } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { logOut, selectUser } from "@/lib/features/Auth/authSlice";
import { clearToken } from "@/lib/features/Auth/tokenSlice";
import { usePathname } from "next/navigation";

export interface NotificationResponse {
  status: string;
  data: NotificationData;
}
export interface NotificationData {
  notifications: Notification[];
}

const Notification = ({ setShowModel }: any) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="text-gray-700 text-md text-left w-full ">
      Notifications
    </DropdownMenuTrigger>
    <DropdownMenuContent side="left" className="max-w-xs">
      <DropdownMenuLabel className="font-normal text-center">
        Notifications
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="flex font-light text-sm text-gray-600 flex-wrap"
        onSelect={() => setShowModel(false)}
      >
        Hi Jude, you have a new message in your inbox. View message
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="font-light text-sm text-gray-600">
        You have not checked your wishlist since you last saved a lodge. H Jude,
        you have a new message in your inbox. Check it out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

function More() {
  const currentUser = useAppSelector(selectUser);
  const [showModel, setShowModel] = useState<boolean | undefined>(undefined);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  console.log(pathname);

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
                {navLinks.map(({ url, title, Icon }) => (
                  <SheetClose asChild key={url} className="w-full">
                    <Link
                      href={url}
                      className={`flex items-center text-gray-800 w-full p-2 rounded-lg hover:bg-zinc-100 gap-2 ${
                        url == pathname && "bg-primary text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {title}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose className="block text-left w-full">
                  <Link
                    href={`/profile/${currentUser && currentUser?._id}`}
                    className="w-full flex items-center p-2 gap-2 text-gray-800 rounded-lg hover:bg-zinc-100"
                  >
                    <GoPerson className="w-5 h-5" />
                    View profile
                  </Link>
                </SheetClose>
                <SheetClose className="block w-full text-left">
                  <Link
                    href="/"
                    onClick={() => {
                      dispatch(Logout());
                      dispatch(clearToken());
                      dispatch(logOut());
                    }}
                    className=" w-full p-2 gap-2 text-gray-800 rounded-lg hover:bg-zinc-100 flex items-center"
                  >
                    <IoLogOutOutline className="w-5 h-5" />
                    Logout
                  </Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>

          <div className="max-md:hidden">
            <DropdownMenu open={showModel}>
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
                {navLinks.map(({ title, url }, i) => {
                  return (
                    <div key={title}>
                      {title == "Notifications" ? (
                        <DropdownMenuItem>
                          <Notification setShowModel={setShowModel} />
                        </DropdownMenuItem>
                      ) : (
                        <div>
                          {i % 3 == 0 && i > 1 && <DropdownMenuSeparator />}
                          <DropdownMenuItem>
                            <Link href={url} className="text-gray-700">
                              {title}
                            </Link>
                          </DropdownMenuItem>
                        </div>
                      )}
                    </div>
                  );
                })}

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
                      dispatch(clearToken());
                      dispatch(logOut());
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
