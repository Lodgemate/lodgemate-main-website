"use client";

import { Logout } from "@/lib/features/Login/signinSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChevronsUpDown } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";

import { LuMenu } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { navDemacators, navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { logOut, selectUser } from "@/lib/features/Auth/authSlice";
import { clearToken } from "@/lib/features/Auth/tokenSlice";
import { usePathname } from "next/navigation";
import SideNotification from "@/components/SideNotification";

export interface NotificationResponse {
  status: string;
  data: NotificationData;
}
export interface NotificationData {
  notifications: Notification[];
}

function More() {
  const currentUser = useAppSelector(selectUser);
  const [showModel, setShowModel] = useState<boolean | undefined>(undefined);
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  console.log({ currentUser });

  return (
    <>
      {currentUser ? (
        <>
          <SideNotification
            setShowNotifications={setShowNotifications}
            showNotifications={showNotifications}
          />
          <div className="">
            <DropdownMenu open={showModel}>
              <DropdownMenuTrigger className="flex items-center flex-col relative bottom-3">
                <div className="md:hidden mt-3 mr-1">
                  <LuMenu className="w-6 h-6" />
                </div>
                <div className="max-md:hidden flex flex-col items-end">
                  <div className="rounded-full bg-red-600 h-3 w-3 grid relative top-2 z-10 -right-1 place-items-center text-xs"></div>
                  <div className="px-[13px] py-2 relative rounded-[8px] shadow-sm mb-2">
                    <div className="flex relative text-[14px] font-medium items-center gap-2">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={currentUser.profilePicture}
                          alt={currentUser.firstName}
                        />
                        <AvatarFallback className="rounded-lg">
                          {currentUser.firstName.charAt(0).toUpperCase()}
                          {currentUser.lastName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {currentUser.firstName}
                        </span>
                        <span className="truncate text-xs">
                          {currentUser.email}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full min-w-[16.5rem] right-5 relative">
                {navLinks.map(({ title, url, Icon }, i) => {
                  return (
                    <div key={title}>
                      {
                        <div>
                          {i % 3 == 0 && i > 1 && (
                            <div className="w-full flex items-center my-3 px-2 justify-between">
                              <p className="text-xs font-semibold ">
                                {navDemacators[i / 3]}
                              </p>{" "}
                              <div className="w-5 h-[2px] bg-stone-500" />
                            </div>
                          )}
                          {i == 0 && (
                            <div className="w-full flex items-center my-3 px-2 justify-between">
                              <p className="text-xs font-semibold ">
                                {navDemacators[i]}
                              </p>{" "}
                              <div className="w-5 h-[2px] bg-stone-500" />
                            </div>
                          )}
                          <DropdownMenuItem>
                            <Link
                              href={title == "Notifications" ? "#" : url}
                              className="text-stone-800 font-normal flex items-center justify-between w-full"
                              onClick={() => {
                                if (title == "Notifications") {
                                  setShowNotifications(true);
                                }
                              }}
                            >
                              <div className="flex items-center gap-1">
                                <Icon className="w-4 h-4" />
                                <p className="text-[13px]">{title}</p>
                              </div>
                              {title == "Notifications" && (
                                <p className="h-6 w-6 grid place-items-center rounded-full bg-red-100 text-red-500">
                                  5
                                </p>
                              )}
                            </Link>
                          </DropdownMenuItem>
                        </div>
                      }
                    </div>
                  );
                })}

                <DropdownMenuItem>
                  <Link
                    href={`/profile/${currentUser?._id}`}
                    className="text-stone-800 font-normal flex gap-1 items-center w-full"
                  >
                    <GoPerson className="h-4 w-4" />
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
                    className="text-stone-800 font-normal flex items-center gap-1 w-full"
                  >
                    <IoIosLogOut className="w-4 h-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
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
