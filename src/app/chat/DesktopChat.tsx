"use client";

import React, { useEffect, useRef, useState } from "react";
import ActiveChats from "./ActiveChats";
import Activemessage from "./Activemessage";
import WebSocketComponent from "@/services/webSocketApi";
import { MainObject } from "./types";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import MobileChat from "./MobileChat";
import UserImage from "@/components/Shared/userImage";

const DesktopChat: React.FC = () => {
  const searchParams = useSearchParams();

  const currentUser = useAppSelector(selectAllUsersdata);
  const [activeChat, setActiveChat] = useState<MainObject | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const myRef = useRef(null);
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    const checkVisibility = () => {
      if (myRef.current) {
        const isVisible =
          window.getComputedStyle(myRef.current).display !== "none";
        isVisible ? setisVisible(true) : setisVisible(false);
        console.log(isVisible ? "Visible" : "Hidden");
      }
    };

    // Check visibility on mount
    checkVisibility();

    // Optionally, you can add a resize event listener to check visibility when the screen size changes
    window.addEventListener("resize", checkVisibility);

    return () => window.removeEventListener("resize", checkVisibility);
  }, []);
  useEffect(() => {
    if (
      (searchParams.get("roomId"),
      searchParams.get("sender"),
      searchParams.get("profilePicture"))
    ) {
      const Data = {
        _id: searchParams.get("roomId"),
        latestMessage: {
          _id: null,
          roomId: searchParams.get("roomId"),
          participants: [
            {
              _id: searchParams.get("sender"),
              firstName: searchParams.get("firstName"),
              lastName: searchParams.get("lastName"),
              verifiedUser: null,
              email: null,
              emailVerified: false,
              profilePicture: searchParams.get("profilePicture"),
              phoneNumber: null,
              gender: searchParams.get("gender"),
              role: null,
              lookingForRoomate: false,
              totalLodges: null,
              totalServices: null,
              signupMethod: "email",
              location: null,
              address_text: null,
              latitude: null,
              longitude: null,
              country: null,
              administrativeArea: searchParams.get("area"),
              subAdministrativeArea: null,
            },
            {
              _id: searchParams.get("reciver"),

              firstName: searchParams.get("firstName"),
              lastName: searchParams.get("lastName"),
              verifiedUser: null,
              email: null,
              emailVerified: false,
              profilePicture: searchParams.get("profilePicture"),
              phoneNumber: null,
              gender: searchParams.get("gender"),
              role: null,
              lookingForRoomate: false,
              totalLodges: null,
              totalServices: null,
              signupMethod: "email",
              location: null,
              address_text: null,
              latitude: null,
              longitude: null,
              country: null,
              administrativeArea: searchParams.get("area"),
              subAdministrativeArea: null,
            },
          ],
          sentBy: searchParams.get("sender"),
        },
      };
      //@ts-ignore
      setActiveChat(Data);
    }
  }, []);

  const [imageError, setImageError] = useState(false); // Track image loading error

  const reciversData = (data: any[]) => {
    const newArr = data.filter(
      (ent: any) => ent?._id !== currentUser?.data.user._id
    );
    return newArr[0];
  };

  console.log(activeChat);

  return (
    <>
      <div
        ref={myRef}
        className='lg:flex hidden w-full max-w-[1200px] border  h-screen pt-[70px] text-[14px] text-lblack'
      >
        {isVisible && (
          <div className='w-1/4 border-r border-gray-300'>
            <div className='p-4 border-b border-gray-300'>
              <h1 className='text-[16px] font-bold'>Your chats</h1>
            </div>
            <div>
              <ActiveChats
                currentUser={currentUser}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
              />
            </div>
          </div>
        )}

        {isVisible && (
          <div className='w-3/5 flex flex-col justify-between p-4'>
            <div className='flex-grow overflow-y-auto'>
              {activeChat && (
                <Activemessage
                  setMessages={setMessages}
                  messages={messages}
                  roomId={activeChat.latestMessage.roomId}
                />
              )}
            </div>
            <WebSocketComponent
              setMessages={setMessages}
              activeChat={activeChat}
            />
          </div>
        )}

        {isVisible && activeChat && (
          <div className='w-1/4 border-l border-gray-300 p-4'>
            <div className='flex flex-col justify-center items-center w-full'>
              <UserImage
                src={
                  reciversData(activeChat.latestMessage.participants)
                    ?.profilePicture
                }
                alt={`${
                  reciversData(activeChat.latestMessage.participants)?.firstName
                }'s profile`}
                size={"w-[45px] h-[45px]"}
                fallbackText={
                  reciversData(activeChat.latestMessage.participants)
                    ?.firstName +
                  " " +
                  reciversData(activeChat.latestMessage.participants)?.lastName
                }
              />
              <div className='text-[16px] font-semibold'>
                {
                  reciversData(activeChat?.latestMessage.participants)
                    ?.firstName
                }
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center border px-[20px] py-[8px] gap-2 rounded-[8px]">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719953600/utilities/LodgeMate_File/ion_male-outline_qtox5s.svg"
                    alt="gender"
                  />
                  <p>
                    {
                      reciversData(activeChat?.latestMessage.participants)
                        ?.gender
                    }
                  </p>
                </div>
                <div className="flex items-center border px-[20px] py-[8px] gap-2 rounded-[8px]">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337645/utilities/LodgeMate_File/home_pin_1_jvqqfs.svg"
                    alt="university"
                  />
                  <p>
                    {
                      reciversData(activeChat?.latestMessage.participants)
                        ?.administrativeArea
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-[1200px] border block lg:hidden ">
        {" "}
        {!isVisible && (
          <MobileChat
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            message={messages}
            setMessage={setMessages}
          />
        )}
      </div>
    </>
  );
};

export default DesktopChat;
