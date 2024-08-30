"use client";

import React, { useEffect, useState } from "react";
import ActiveChats from "./ActiveChats";
import Activemessage from "./Activemessage";
import WebSocketComponent from "@/services/webSocketApi";
import { MainObject } from "./types";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";

const DesktopChat: React.FC = () => {
  const searchParams = useSearchParams();
  const currentUser = useAppSelector(selectAllUsersdata);
  const [activeChat, setActiveChat] = useState<MainObject | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
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
    if (searchParams.get("roomId")) {
      //@ts-ignore
      setActiveChat(Data);
    }
  }, []);

  const reciversData = (data: any[]) => {
    const newArr = data.filter(
      (ent: any) => ent?._id !== currentUser?.data.user._id
    );
    return newArr[0];
  };


  return (
    <div className='flex h-screen pt-[70px] text-[16px] text-lblack'>
      {/* First Column */}
      <div className='w-1/4 border-r border-gray-300'>
        <div className='p-4 border-b border-gray-300'>
          <h1 className='text-lg font-bold'>Your chats</h1>
        </div>
        <div>
          <ActiveChats
            currentUser={currentUser}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
        </div>
      </div>

      {/* Second Column */}
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
        <WebSocketComponent setMessages={setMessages} activeChat={activeChat} />
      </div>

      {/* Third Column */}
      {activeChat && (
        <div className='w-1/4 border-l border-gray-300 p-4'>
          <div className='flex flex-col justify-center items-center w-full'>
            <img
              src={
                reciversData(activeChat?.latestMessage.participants)
                  .profilePicture
              }
              alt={`${
                reciversData(activeChat?.latestMessage.participants).firstName
              }'s profile`}
              className='w-24 h-24 rounded-full mb-4'
            />
            <div className='text-lg font-semibold'>
              {reciversData(activeChat?.latestMessage.participants).firstName}
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex items-center border px-[20px] py-[8px] gap-2 rounded-[8px]'>
                <img
                  src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719953600/utilities/LodgeMate_File/ion_male-outline_qtox5s.svg'
                  alt='gender'
                />
                <p>
                  {reciversData(activeChat?.latestMessage.participants).gender}
                </p>
              </div>
              <div className='flex items-center border px-[20px] py-[8px] gap-2 rounded-[8px]'>
                <img
                  src='https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337645/utilities/LodgeMate_File/home_pin_1_jvqqfs.svg'
                  alt='university'
                />
                <p>
                  {
                    reciversData(activeChat?.latestMessage.participants)
                      .administrativeArea
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopChat;
