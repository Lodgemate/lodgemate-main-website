"use client";

import { selectAllUsersdata } from "@/lib/features/Users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";
import ActiveChats from "./ActiveChats";
import Activemessage from "./Activemessage";
import WebSocketComponent from "@/services/webSocketApi";
import { MainObject } from "./types";
import UserImage from "@/components/Shared/userImage";
import Link from "next/link";

interface ChatMessage {
  id: number;
  text: string;
  received: boolean;
}

interface ChatPreview {
  id: number;
  name: string;
  message: string;
  time: string;
  profileImg: string;
  messages: ChatMessage[];
}

interface mobileProps {
  activeChat: MainObject | null;
  setActiveChat: (arg: any) => void;
  message: any;
  setMessage: (arg: any) => void;
}

const MobileChat: React.FC<mobileProps> = ({
  activeChat,
  setActiveChat,
  message,
  setMessage,
}) => {
  console.log(activeChat);

  const [showProfile, setShowProfile] = useState<boolean>(false);
  const currentUser = useAppSelector(selectAllUsersdata);

  const reciversData = (data: any[]) => {
    const newArr = data.filter(
      (ent: any) => ent?._id !== currentUser?.data.user._id
    );
    return newArr[0];
  };

  return (
    <div className=" lg:hidden w-full max-w-[1200px] border flex flex-col h-screen bg-white mt-[80px]">
      {!activeChat ? (
        <div className="p-4">
          <h1 className="text-[16px] font-bold mb-4">Chats</h1>
          {/* {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-center">
                <img
                  src={chat.profileImg}
                  alt={`${chat.name}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="font-semibold">{chat.name}</div>
                  <div className="text-sm text-gray-600 truncate w-40">
                    {chat.message}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{chat.time}</div>
            </div>
          ))} */}
          <ActiveChats
            currentUser={currentUser}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 border-b border-gray-200">
            <button
              onClick={() => setActiveChat(null)}
              className="mr-4 text-gray-500"
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719102154/utilities/LodgeMate_File/lucide_move-up_zjmfel.svg"
                alt="Back"
                className="w-6 h-6"
              />
            </button>
            <Link
              href={`/profile/${activeChat.latestMessage.participants[0]._id}`}
              >
                 <UserImage
              onclick={() => setShowProfile(true)}
              src={
                reciversData(activeChat.latestMessage.participants)
                  ?.profilePicture
              }
              alt={`${
                reciversData(activeChat.latestMessage.participants)?.firstName
              }'s profile`}
              size={"w-10 h-10 rounded-full cursor-pointer"}
              fallbackText={
                reciversData(activeChat.latestMessage.participants)?.firstName +
                " " +
                reciversData(activeChat.latestMessage.participants)?.lastName
              }
            />
            </Link>
           

            <div className="ml-3">
              <div className="font-semibold text-[16px]">
                {
                  reciversData(activeChat?.latestMessage.participants)
                    ?.firstName
                }
              </div>
            </div>
          </div>
          <div className="flex-grow h-[] p-4 overflow-y-auto">
            {/* <Activemessage
                setMessages={setMessages}
                messages={messages}
                roomId={activeChat.latestMessage.roomId}
              /> */}
            <Activemessage
              setMessages={setMessage}
              messages={message}
              roomId={activeChat.latestMessage.roomId}
            />
          </div>
          {/* {activeChat && (
            <div className="flex items-center p-4 border-t border-gray-300">
              <div className="flex items-center p-1 bg-[#30a2ff28] h-[48px] w-full rounded-full pl-2 pr-4">
                <button className="mr-1 text-gray-500 sm:flex hidden">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/Add_kdegc6.svg"
                    alt="add"
                    className=""
                  />
                </button>
                <input
                  type="text"
                  placeholder="Say Hi..."
                  value={message}
                  onChange={handleInputChange}
                  className="flex-grow px-4 py-2 bg-transparent rounded-lg focus:outline-none "
                />
                <button className="ml-2 text-gray-500">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/bi_emoji-smile_ph5jwq.svg"
                    alt=""
                  />
                </button>
              </div>

              {message ? (
                <button className="ml-2 text-blue-500 font-bold">Send</button>
              ) : (
                <>
                  <button className="ml-2 text-gray-500 h-[48px]">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/ic_baseline-phone_sq7scg.svg"
                      alt=""
                      className="h-[40px] w-[40px]"
                    />
                  </button>
                  <button className="ml-2 text-gray-500">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/mic_kgxbgm.svg"
                      alt=""
                      className="h-[40px] w-[40px]"
                    />
                  </button>
                </>
              )}
            </div>
          )} */}
          <WebSocketComponent
            setMessages={setMessage}
            activeChat={activeChat}
          />
          {/* Profile Popup */}
          {showProfile && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-80">
                <img
                  src={
                    reciversData(activeChat?.latestMessage.participants)
                      ?.profilePicture
                  }
                  alt={`${
                    reciversData(activeChat?.latestMessage.participants)
                      ?.firstName
                  }'s profile`}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <div className="text-center font-semibold text-[16px] mb-4">
                  {
                    reciversData(activeChat?.latestMessage.participants)
                      ?.firstName
                  }
                </div>
                <div className="flex justify-around mb-4">
                  <div className="flex items-center space-x-2">
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
                  <div className="flex items-center space-x-2">
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
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => setShowProfile(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileChat;
