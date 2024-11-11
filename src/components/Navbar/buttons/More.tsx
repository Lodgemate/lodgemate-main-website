"use client";

import NotificationModal from "@/components/modals/NotificationModal";
import {
  Logout,
  selectAllAuthenticated,
} from "@/lib/features/Login/signinSlice";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMenu } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { navLinks } from "@/constants";

export interface NotificationResponse {
  status: string;
  data: NotificationData;
}

export interface NotificationData {
  notifications: Notification[];
}

interface Notification {
  _id: string;
  userId: string;
  title: string;
  body: string;
  resource: string;
  resourceId: string;
  extra: Extra; // Parsed into an object
  read: boolean;
  dateCreated: string;
}

interface Extra {
  participants: string[];
  sentBy: string;
  fullname: string;
  profilePicture: string;
  message: string;
  sId: string;
  roomId: string;
}

function More() {
  const currentUser = useAppSelector(selectAllUsersdata);
  const dispatch = useAppDispatch();

  return (
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
            href={`/profile/${currentUser?.data.user._id}`}
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
  );
}

export default More;
