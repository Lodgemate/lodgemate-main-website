"use client";

import React, { useState, ChangeEvent } from "react";

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

const chats: ChatPreview[] = [
  {
    id: 1,
    name: "John Doe",
    message:
      "Hello Sir, I’m John. I’m interested in being your roommate. Is the room still available?",
    time: "02:20pm",
    profileImg:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719950708/utilities/LodgeMate_File/1234_qyeour.svg",
    messages: [
      {
        id: 1,
        text: "Hello Sir, I’m John. I’m interested in being your roommate. Is the room still available?",
        received: true,
      },
      {
        id: 2,
        text: "I’d appreciate it if you could let me know the best way to communicate. How about using WhatsApp?",
        received: true,
      },
      {
        id: 3,
        text: "Hi John 👋 Good afternoon, Yes, the room is still available.",
        received: false,
      },
    ],
  },
  {
    id: 2,
    name: "Zack Fox",
    message:
      "Hey, I'm Zack. Is the room still up for grabs? I'd love to be your roommate.",
    time: "02:25pm",
    profileImg:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719951183/utilities/LodgeMate_File/wqer_b0cdon.svg",
    messages: [
      {
        id: 1,
        text: "Hey, I'm Zack. Is the room still up for grabs? I'd love to be your roommate.",
        received: true,
      },
      {
        id: 2,
        text: "Can you let me know the best way to reach you? Maybe we could chat on WhatsApp.",
        received: true,
      },
      {
        id: 3,
        text: "Hello Zack 👋 Good afternoon, Yes, the room is still available.",
        received: false,
      },
    ],
  },
  {
    id: 3,
    name: "Lion James",
    message:
      "Hi, I'm Lion. Just checking if the room is still available. I'd like to move in.",
    time: "02:30pm",
    profileImg:
      "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719951182/utilities/LodgeMate_File/456768iok_snh1up.svg",
    messages: [
      {
        id: 1,
        text: "Hi, I'm Lion. Just checking if the room is still available. I'd like to move in.",
        received: true,
      },
      {
        id: 2,
        text: "What's the best way to keep in touch? I think WhatsApp would be convenient.",
        received: true,
      },
      {
        id: 3,
        text: "Hello Lion 👋 Good afternoon, Yes, the room is still available.",
        received: false,
      },
    ],
  },

  // Add more chat previews here
];

const DesktopChat: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ChatPreview | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex h-screen pt-[70px] text-lblack">
      {/* First Column */}
      <div className="w-1/4 border-r border-gray-300">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-[16px] font-bold">Your chats</h1>
        </div>
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex justify-between items-start p-4 border-b border-gray-300 cursor-pointer ${
                activeChat?.id === chat.id ? "bg-[#F5F5F5]" : "bg-white"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-center ">
                <img
                  src={chat.profileImg}
                  alt={`${chat.name}'s profile`}
                  className="w-[45px] h-[45px] rounded-full"
                />
                <div className="ml-4">
                  <div className="font-semibold">{chat.name}</div>
                  <div className="w-[150px] truncate text-[12px]">
                    {chat.message}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 ">{chat.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Column */}
      <div className="w-3/5 flex flex-col justify-between p- text-[12px]">
        <div className="flex-grow overflow-y-auto">
          {activeChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-2 ${
                msg.received ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs p-3  ${
                  msg.received
                    ? "bg-[#30a2ff28] text-[#093576] rounded-r-[12px] rounded-t-[12px]"
                    : "bg-primary text-white rounded-l-[12px] rounded-t-[12px]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {activeChat && (
          <div className="flex items-center p-4 border-t border-gray-300">
            <div className="flex items-center p-1 bg-[#30a2ff28] h-[48px] w-full rounded-full pl-2 pr-4">
              <button className="mr-1 text-gray-500">
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719952823/utilities/LodgeMate_File/Add_kdegc6.svg"
                  alt="add"
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
        )}
      </div>

      {/* Third Column */}
      {activeChat && (
        <div className="w-1/4 border-l border-gray-300 p-4">
          <div className="flex flex-col justify-center items-center w-full">
            <img
              src={activeChat.profileImg}
              alt={`${activeChat.name}'s profile`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="t font-semibold">{activeChat.name}</div>
            <div className="flex items-center capitalize text-[10px] gap-2">
              <div className="flex items-center border px-[20px] py-[8px] gap-2 rounded-[8px]">
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1719953600/utilities/LodgeMate_File/ion_male-outline_qtox5s.svg"
                  alt="gender"
                />
                <p>Male</p>
              </div>
              <div className="flex items-center border px-[20px] py-[8px] gap-2 rounded-[8px]">
                <img
                  src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1718337645/utilities/LodgeMate_File/home_pin_1_jvqqfs.svg"
                  alt="university"
                />
                <p>FUTO</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopChat;
